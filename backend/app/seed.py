from datetime import date

from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.airline import Airline
from app.models.law import Law
from app.models.verdict import Verdict


def seed_database() -> None:
    db: Session = SessionLocal()
    try:
        if db.query(Verdict).count() > 0:
            return

        tibi = Law(
            law_name="Tibi Law",
            description="Israeli Aviation Services Law (חוק שירותי תעופה) governing passenger compensation.",
        )
        eu261 = Law(
            law_name="EU 261",
            description="European regulation on compensation and assistance to passengers in denied boarding, cancellation, or long delay.",
        )
        db.add_all([tibi, eu261])
        db.flush()

        airlines = [
            Airline(name="El Al", iata_code="LY", logo_url=None),
            Airline(name="Arkia", iata_code="IZ", logo_url=None),
            Airline(name="Israir", iata_code="6H", logo_url=None),
            Airline(name="Wizz Air", iata_code="W6", logo_url=None),
            Airline(name="Ryanair", iata_code="FR", logo_url=None),
        ]
        db.add_all(airlines)
        db.flush()

        airline_map = {airline.iata_code: airline for airline in airlines}

        sample_verdicts = [
            Verdict(
                airline_id=airline_map["LY"].id,
                law_id=tibi.id,
                case_number="51234-03-24",
                slug="el-al-flight-ly315-mechanical-delay",
                date=date(2024, 6, 12),
                amount=3000,
                currency="ILS",
                delay_reason="Mechanical failure",
                disruption_type="delay",
                flight_number="LY315",
                summary="Passenger awarded full Tibi Law compensation after an 11-hour delay caused by mechanical issues on TLV–JFK.",
            ),
            Verdict(
                airline_id=airline_map["LY"].id,
                law_id=tibi.id,
                case_number="48721-11-23",
                slug="el-al-flight-ly001-cancellation",
                date=date(2023, 11, 8),
                amount=2500,
                currency="ILS",
                delay_reason="Crew shortage",
                disruption_type="cancellation",
                flight_number="LY001",
                summary="Court ruled cancellation without adequate notice entitles passenger to compensation plus legal expenses.",
            ),
            Verdict(
                airline_id=airline_map["IZ"].id,
                law_id=tibi.id,
                case_number="60112-05-24",
                slug="arkia-flight-iz161-overbooking",
                date=date(2024, 5, 19),
                amount=2000,
                currency="ILS",
                delay_reason="Overbooking",
                disruption_type="overbooking",
                flight_number="IZ161",
                summary="Denied boarding due to overbooking; airline failed to offer re-routing within required timeframe.",
            ),
            Verdict(
                airline_id=airline_map["W6"].id,
                law_id=eu261.id,
                case_number="33409-02-24",
                slug="wizz-air-flight-w62201-weather-delay",
                date=date(2024, 2, 27),
                amount=400,
                currency="EUR",
                delay_reason="Operational delay",
                disruption_type="delay",
                flight_number="W62201",
                summary="EU261 applied on TLV–BUD route; extraordinary circumstances defense rejected for operational delay.",
            ),
            Verdict(
                airline_id=airline_map["FR"].id,
                law_id=eu261.id,
                case_number="29877-09-23",
                slug="ryanair-flight-fr1234-late-arrival",
                date=date(2023, 9, 14),
                amount=250,
                currency="EUR",
                delay_reason="Late inbound aircraft",
                disruption_type="delay",
                flight_number="FR1234",
                summary="Short-haul delay exceeded three hours at arrival; fixed compensation of €250 upheld.",
            ),
            Verdict(
                airline_id=airline_map["6H"].id,
                law_id=tibi.id,
                case_number="55001-01-25",
                slug="israir-flight-6h789-baggage-delay",
                date=date(2025, 1, 22),
                amount=1500,
                currency="ILS",
                delay_reason="Baggage handling",
                disruption_type="other",
                flight_number="6H789",
                summary="Partial award combining delay compensation and documented expenses from missed connection.",
            ),
        ]
        db.add_all(sample_verdicts)
        db.commit()
    finally:
        db.close()
