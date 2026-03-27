import en from "../i18n/en.json";
import ptBR from "../i18n/pt-BR.json";

const translations: { [key: string]: { [key: string]: string } } = {
  en,
  "pt-BR": ptBR,
};

export function getMessage(key: string, lang: string = "en"): string {
  const translation = translations[lang] || translations.en;
  return translation[key] || key;
}

export function getLang(req: any): string {
  // Check query param first, then Accept-Language header
  const lang =
    req.query.lang ||
    req.headers["accept-language"]?.split(",")[0]?.split("-")[0];
  return lang === "pt" || lang === "pt-BR"
    ? "pt-BR"
    : lang === "en"
      ? "en"
      : "en";
}
