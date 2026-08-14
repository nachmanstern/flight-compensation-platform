from uuid import UUID

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from pydantic import BaseModel
from sqlalchemy.orm import Session, joinedload

from app.core.database import get_db
from app.core.security import verify_admin_key
from app.models.verdict import Verdict
from app.schemas import VerdictCreate, VerdictRead
from app.scraper.net_hamishpat import scrape_search_results
from app.scraper.pdf_parser import parse_verdict_pdf

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(verify_admin_key)])


class ScrapeRequest(BaseModel):
    query: str
    limit: int = 10


class ScrapeResult(BaseModel):
    case_number: str
    title: str
    summary: str
    source_url: str
    amount: int | None = None


class PdfParseResult(BaseModel):
    case_number: str | None
    summary: str
    amount: int | None
    currency: str | None


@router.get("/verdicts", response_model=list[VerdictRead])
def admin_list_verdicts(db: Session = Depends(get_db)):
    return (
        db.query(Verdict)
        .options(joinedload(Verdict.airline), joinedload(Verdict.law))
        .order_by(Verdict.date.desc())
        .all()
    )


@router.post("/verdicts", response_model=VerdictRead, status_code=201)
def admin_create_verdict(payload: VerdictCreate, db: Session = Depends(get_db)):
    existing = db.query(Verdict).filter(Verdict.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=409, detail="Slug already exists")

    verdict = Verdict(**payload.model_dump())
    db.add(verdict)
    db.commit()
    db.refresh(verdict)
    return (
        db.query(Verdict)
        .options(joinedload(Verdict.airline), joinedload(Verdict.law))
        .filter(Verdict.id == verdict.id)
        .first()
    )


@router.delete("/verdicts/{verdict_id}", status_code=204)
def admin_delete_verdict(verdict_id: UUID, db: Session = Depends(get_db)):
    verdict = db.query(Verdict).filter(Verdict.id == verdict_id).first()
    if not verdict:
        raise HTTPException(status_code=404, detail="Verdict not found")
    db.delete(verdict)
    db.commit()


@router.post("/scrape", response_model=list[ScrapeResult])
def admin_scrape(payload: ScrapeRequest):
    try:
        results = scrape_search_results(payload.query, limit=payload.limit)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Scrape failed: {exc}") from exc
    return [ScrapeResult(**result.__dict__) for result in results]


@router.post("/parse-pdf", response_model=PdfParseResult)
async def admin_parse_pdf(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    import tempfile
    from pathlib import Path

    with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
        tmp.write(await file.read())
        tmp_path = Path(tmp.name)

    try:
        parsed = parse_verdict_pdf(tmp_path)
    except Exception as exc:
        raise HTTPException(status_code=422, detail=f"PDF parse failed: {exc}") from exc
    finally:
        tmp_path.unlink(missing_ok=True)

    return PdfParseResult(
        case_number=parsed.case_number,
        summary=parsed.summary,
        amount=parsed.amount,
        currency=parsed.currency,
    )
