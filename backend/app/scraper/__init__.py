"""Placeholder for court document scraping from Net-HaMishpat / Nevo."""

from dataclasses import dataclass


@dataclass
class ScrapedVerdict:
    case_number: str
    date: str
    summary: str
    amount: int | None


def scrape_verdict_list(query: str) -> list[ScrapedVerdict]:
    """Future implementation: scrape public legal databases."""
    raise NotImplementedError("Scraper pipeline not yet connected to live sources")
