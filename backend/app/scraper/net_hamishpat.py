"""Scraper utilities for public Israeli court databases."""

from dataclasses import dataclass

import requests
from bs4 import BeautifulSoup

SEARCH_URL = "https://www.gov.il/he/departments/legalinfo/court_decisions"


@dataclass
class ScrapedVerdict:
    case_number: str
    title: str
    summary: str
    source_url: str
    amount: int | None = None


def scrape_search_results(query: str, limit: int = 20) -> list[ScrapedVerdict]:
    """Fetch and parse public search result pages.

    Note: live endpoints may require site-specific selectors and respectful rate limits.
    """
    response = requests.get(
        SEARCH_URL,
        params={"q": query},
        timeout=20,
        headers={"User-Agent": "FlightCompensationBot/1.0 (+legal research)"},
    )
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    results: list[ScrapedVerdict] = []

    for item in soup.select("article, .search-result, li")[:limit]:
        title_el = item.select_one("h2, h3, a")
        if not title_el:
            continue

        title = title_el.get_text(strip=True)
        if not title:
            continue

        link = title_el.get("href") if title_el.name == "a" else item.select_one("a")
        href = link.get("href") if link else SEARCH_URL
        if href.startswith("/"):
            href = f"https://www.gov.il{href}"

        summary_el = item.select_one("p")
        summary = summary_el.get_text(strip=True) if summary_el else title

        results.append(
            ScrapedVerdict(
                case_number=title.split()[0] if title else "unknown",
                title=title,
                summary=summary,
                source_url=href,
            )
        )

    return results
