import Link from "next/link";
import { profile } from "@/content/profile";
import { siteText } from "@/content/site-text";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-name">{profile.name}</p>
          <p className="text-muted">{siteText.footer.note}</p>
        </div>
        <div className="footer-links">
          {profile.githubUrl && <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub</a>}
          {profile.linkedinUrl && <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>}
          <Link href="#top">{siteText.footer.backToTop} ↑</Link>
        </div>
      </div>
    </footer>
  );
}
