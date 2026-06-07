import { Icon } from '@/components/Icon';
import type { CvData } from '@/lib/data';

// Dokumen CV template "2 kolom + sidebar"; menumpuk di layar kecil.
export function CvDocument({ cv }: { cv: CvData }) {
  return (
    <article className="mx-auto flex max-w-3xl flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-level-1 md:flex-row">
      {/* Sidebar */}
      <div className="bg-primary px-lg py-xl text-on-primary md:w-[38%]">
        <h2 className="text-headline-md font-bold leading-tight text-on-primary">{cv.name}</h2>
        <p className="mt-1 text-body-md text-on-primary/85">{cv.headline}</p>

        <SidebarSection title="Kontak">
          <ContactRow icon="location_on" text={cv.location} />
          <ContactRow icon="mail" text={cv.contact.email} />
          <ContactRow icon="call" text={cv.contact.phone} />
          <ContactRow icon="hub" text={cv.contact.linkedin} />
        </SidebarSection>

        <SidebarSection title="Keahlian">
          <ul className="space-y-1.5">
            {cv.skills.map((s) => (
              <li key={s} className="flex items-center gap-2 text-body-md text-on-primary/90">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-on-primary/70" />
                {s}
              </li>
            ))}
          </ul>
        </SidebarSection>

        <SidebarSection title="Pendidikan">
          {cv.education.map((e) => (
            <div key={e.degree} className="mb-md last:mb-0">
              <p className="text-label-md font-semibold text-on-primary">{e.degree}</p>
              <p className="text-caption text-on-primary/85">{e.school}</p>
              <p className="text-caption text-on-primary/70">{e.period}</p>
            </div>
          ))}
        </SidebarSection>
      </div>

      {/* Konten utama */}
      <div className="flex-1 px-lg py-xl">
        <MainSection title="Tentang">
          <p className="text-body-md leading-relaxed text-on-surface-variant">{cv.about}</p>
        </MainSection>

        <MainSection title="Pengalaman">
          <ol className="space-y-lg">
            {cv.experience.map((e) => (
              <li key={`${e.role}-${e.company}`} className="relative border-l-2 border-outline-variant pl-md">
                <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-primary" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <p className="text-label-md font-bold text-on-surface">{e.role}</p>
                  <p className="text-caption text-on-surface-variant">{e.period}</p>
                </div>
                <p className="text-body-md font-medium text-primary">{e.company}</p>
                <ul className="mt-2 space-y-1">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-body-md text-on-surface-variant">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-on-surface-variant/60" />
                      {b}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </MainSection>
      </div>
    </article>
  );
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-lg">
      <h3 className="mb-sm text-label-md font-bold uppercase tracking-wider text-on-primary/70">{title}</h3>
      {children}
    </section>
  );
}

function ContactRow({ icon, text }: { icon: string; text: string }) {
  return (
    <p className="flex items-center gap-2 text-body-md text-on-primary/90">
      <Icon name={icon} size={16} className="shrink-0 text-on-primary/70" />
      <span className="break-all">{text}</span>
    </p>
  );
}

function MainSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-lg last:mb-0">
      <h3 className="mb-md border-b-2 border-primary pb-1 text-label-md font-bold uppercase tracking-wider text-primary">
        {title}
      </h3>
      {children}
    </section>
  );
}
