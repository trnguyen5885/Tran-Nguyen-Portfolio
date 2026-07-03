import Link from "next/link";
import { siteText } from "@/content/site-text";

export default function NotFound() {
  const t = siteText.notFound;
  return (
    <main id="main-content" className="not-found container">
      <p className="eyebrow">404</p>
      <h1>{t.title}</h1>
      <p className="text-muted">{t.body}</p>
      <Link className="button button-primary" href="/">{t.action}</Link>
    </main>
  );
}
