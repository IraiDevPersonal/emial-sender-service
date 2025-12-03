import "dotenv/config";
import envVar from "env-var";

export const ENVS = {
	PORT: envVar.get("PORT").required().asPortNumber(),
	LOG_LEVEL: envVar.get("LOG_LEVEL").default("info").asString(),
	ALLOWED_ORIGINS: envVar.get("ALLOWED_ORIGINS").default("*").asArray(),
	NODE_ENV: envVar.get("NODE_ENV").default("development").asString(),
	EMAIL_USER: envVar.get("EMAIL_USER").required().asString(),
	EMAIL_PASS: envVar.get("EMAIL_PASS").required().asString(),
	DESTINATIONS: envVar.get("DESTINATIONS").required().asArray(),
};
