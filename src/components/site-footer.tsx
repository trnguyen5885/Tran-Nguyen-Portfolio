import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { profile } from "@/content/profile";

export async function SiteFooter() {
  const t = await getTranslations("Footer");

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-name">{profile.name}</p>
          <p className="text-muted">{t("note")}</p>
        </div>
        <div className="footer-links">
          {profile.githubUrl && <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub</a>}
          {profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>}
          <Link href="#top">{t("backToTop")} ↑</Link>
        </div>
      </div>
    </footer>
  );
}
