import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  return (
    <main id="main-content" className="not-found container">
      <p className="eyebrow">404</p>
      <h1>{t("title")}</h1>
      <p className="text-muted">{t("body")}</p>
      <Link className="button button-primary" href="/">{t("action")}</Link>
    </main>
  );
}
