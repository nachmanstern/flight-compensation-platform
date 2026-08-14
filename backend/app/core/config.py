from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql://flightcomp:flightcomp@localhost:5432/flight_compensation"
    cors_origins: str = "http://localhost:3000"
    admin_api_key: str = "dev-admin-key-change-me"

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    class Config:
        env_file = ".env"


settings = Settings()
