import { SiteChrome } from './SiteChrome';

/** Kerangka halaman dokumen statis (Bantuan, Ketentuan, Kebijakan Privasi). */
export function DocPage({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro?: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <SiteChrome>
      <header className="bg-primary-container px-lg py-xl">
        <div className="mx-auto max-w-app">
          <h1 className="text-headline-lg text-on-primary-container">{title}</h1>
          {intro && <p className="mt-2 max-w-2xl text-body-lg text-on-primary-container/90">{intro}</p>}
        </div>
      </header>
      <article className="mx-auto max-w-3xl space-y-xl px-lg py-2xl">
        {updated && <p className="text-caption text-on-surface-variant">Terakhir diperbarui: {updated}</p>}
        {children}
      </article>
    </SiteChrome>
  );
}

export function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-sm">
      <h2 className="text-title-lg font-semibold text-on-surface">{title}</h2>
      <div className="space-y-sm text-body-md leading-relaxed text-on-surface-variant">{children}</div>
    </section>
  );
}
