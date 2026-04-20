from __future__ import annotations

import html
import json
import re
import urllib.parse
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Iterable, List

import feedparser

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "data" / "news.json"
MAX_ITEMS_PER_TOPIC = 12

TOPIC_DEFINITIONS = {
    "atb": {
        "queries": [
            '(Honeywell OR Siemens OR Bosch OR NSC OR detectomat) (Brandmeldetechnik OR Brandmeldeanlage OR "fire detection" OR "fire alarm")',
            '(Honeywell OR Siemens OR Bosch OR NSC OR detectomat) (Sicherheitslösung OR Brandschutz OR "fire safety")',
        ],
        "tag_hints": [
            "Honeywell",
            "Siemens",
            "Bosch",
            "NSC",
            "detectomat",
            "Brandmeldetechnik",
            "Brandschutz",
            "Fire Safety",
        ],
    },
    "pfs": {
        "queries": [
            '("Ei Electronics" OR Hager OR Pyrexx OR "X-Sense" OR Bosch) (Rauchwarnmelder OR Rauchmelder OR "smoke alarm")',
            '("Ei Electronics" OR Hager OR Pyrexx OR "X-Sense" OR Bosch) (Wohnungswirtschaft OR Residential OR Smart Home)',
        ],
        "tag_hints": [
            "Ei",
            "Ei Electronics",
            "Hager",
            "Pyrexx",
            "X-Sense",
            "Bosch",
            "Rauchwarnmelder",
            "Residential",
            "Smart Home",
        ],
    },
    "doors": {
        "queries": [
            '(Dictator OR Protronic OR Hörmann OR Hormann OR GEZE OR "Argus Security" OR Apollo) (Feststellanlage OR Türsysteme OR Türschließer OR "door automation")',
            '(Dictator OR Protronic OR Hörmann OR Hormann OR GEZE OR "Argus Security" OR Apollo) (Zutritt OR Zugang OR "access control")',
        ],
        "tag_hints": [
            "Dictator",
            "Protronic",
            "Hörmann",
            "Hormann",
            "GEZE",
            "Argus Security",
            "Apollo",
            "Feststellanlage",
            "Türsysteme",
            "Zutritt",
        ],
    },
    "trends": {
        "queries": [
            '("smart building" OR Gebäudeautomation OR Retrofit OR Bestandssanierung) (Brandschutz OR Sicherheit OR "fire safety")',
            '(Cybersecurity OR Cybersicherheit OR KI OR AI) (Gebäude OR Brandschutz OR Sicherheitssysteme)',
            '(Normen OR Regulierung OR ESG OR Nachhaltigkeit) (Gebäude OR Brandschutz OR Sicherheitslösungen)',
        ],
        "tag_hints": [
            "Smart Building",
            "Gebäudeautomation",
            "Retrofit",
            "Cybersecurity",
            "KI",
            "AI",
            "Normen",
            "Regulierung",
            "ESG",
            "Nachhaltigkeit",
        ],
    },
}


def google_news_rss_url(query: str) -> str:
    params = {
        "q": query,
        "hl": "de",
        "gl": "DE",
        "ceid": "DE:de",
    }
    return "https://news.google.com/rss/search?" + urllib.parse.urlencode(params)


def strip_html(raw: str) -> str:
    if not raw:
        return ""
    text = re.sub(r"<br\s*/?>", " ", raw, flags=re.IGNORECASE)
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def parse_published(entry) -> str:
    tm = getattr(entry, "published_parsed", None) or getattr(entry, "updated_parsed", None)
    if tm is not None:
        return datetime(*tm[:6], tzinfo=timezone.utc).isoformat()
    return datetime.now(timezone.utc).isoformat()


def infer_tags(text: str, hints: Iterable[str]) -> List[str]:
    text_lower = text.lower()
    tags: List[str] = []
    for hint in hints:
        if hint.lower() in text_lower:
            normalized = "Hörmann" if hint == "Hormann" else hint
            if normalized not in tags:
                tags.append(normalized)
    return tags[:3]


def normalize_link(link: str) -> str:
    if not link:
        return "#"
    return link.strip()


def build_item(entry, hints: Iterable[str]) -> Dict[str, object]:
    title = strip_html(entry.get("title", ""))
    summary = strip_html(entry.get("summary", ""))
    source = strip_html(entry.get("source", {}).get("title", "")) or strip_html(entry.get("author", "")) or "Quelle unbekannt"
    published_at = parse_published(entry)
    link = normalize_link(entry.get("link", "#"))
    tags = infer_tags(f"{title} {summary} {source}", hints)
    if not tags and source and source != "Quelle unbekannt":
        tags = [source]

    return {
        "title": title,
        "source": source,
        "publishedAt": published_at,
        "summary": summary[:320] if summary else "Keine Kurzbeschreibung im Feed vorhanden.",
        "url": link,
        "tags": tags,
    }


def dedupe_items(items: List[Dict[str, object]]) -> List[Dict[str, object]]:
    seen = set()
    deduped = []
    for item in sorted(items, key=lambda x: x["publishedAt"], reverse=True):
        key = (
            str(item["title"]).strip().lower(),
            str(item["url"]).strip().lower(),
        )
        if key in seen:
            continue
        seen.add(key)
        deduped.append(item)
    return deduped


def fetch_topic_items(topic_id: str, topic_config: Dict[str, object]) -> List[Dict[str, object]]:
    hints = topic_config["tag_hints"]
    collected: List[Dict[str, object]] = []

    for query in topic_config["queries"]:
      feed_url = google_news_rss_url(query)
      feed = feedparser.parse(feed_url)
      for entry in feed.entries:
          item = build_item(entry, hints)
          if len(item["title"]) < 12:
              continue
          collected.append(item)

    return dedupe_items(collected)[:MAX_ITEMS_PER_TOPIC]


def main() -> int:
    items_by_topic: Dict[str, List[Dict[str, object]]] = {}

    for topic_id, topic_config in TOPIC_DEFINITIONS.items():
        items_by_topic[topic_id] = fetch_topic_items(topic_id, topic_config)

    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "sourceMode": "github-actions-rss",
        "itemsByTopic": items_by_topic,
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH}")
    for topic_id, items in items_by_topic.items():
        print(f"- {topic_id}: {len(items)} items")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
