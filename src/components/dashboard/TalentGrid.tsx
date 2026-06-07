import { Icon } from '@/components/Icon';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Checkbox } from '@/components/ui/Checkbox';
import { StarRating } from '@/components/ui/StarRating';
import { AvatarInitial } from '@/components/Placeholder';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { talents } from '@/lib/data';

/** Filter + grid kandidat talent pool. Presentational, tanpa chrome. */
export function TalentGrid() {
  return (
    <div className="flex flex-col gap-xl md:flex-row">
      <aside className="w-full flex-shrink-0 md:w-64">
        <div className="space-y-lg md:sticky md:top-24">
          <label className="flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-lowest px-md py-2">
            <Icon name="search" className="text-on-surface-variant" size={20} />
            <input
              className="w-full border-0 bg-transparent text-body-md outline-none placeholder:text-on-surface-variant"
              placeholder="Cari keahlian"
              aria-label="Cari keahlian"
            />
          </label>
          <FilterGroup title="Keahlian" options={['React', 'Figma', 'Python', 'SEO', 'TypeScript']} />
          <FilterGroup title="Pengalaman" options={['1-3 Tahun', '3-5 Tahun', '5+ Tahun']} />
          <FilterGroup
            title="Status"
            options={['Terbuka untuk peluang']}
            defaultChecked={['Terbuka untuk peluang']}
          />
        </div>
      </aside>

      <div className="flex-1">
        <div className="mb-md flex items-center justify-between border-b border-outline-variant pb-md">
          <span className="text-body-md text-on-surface-variant">
            <span className="font-semibold text-on-surface">{talents.length}</span> talenta ditemukan
          </span>
        </div>
        <div className="grid gap-md sm:grid-cols-2">
          {talents.map((t) => (
            <ScrollReveal
              key={t.name}
              as="article"
              y={16}
              className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg transition-[transform,box-shadow] duration-200 ease-out-quint hover:-translate-y-0.5 hover:shadow-level-2"
            >
              <div className="flex items-start gap-md">
                <AvatarInitial name={t.name} className="h-12 w-12 text-title-lg" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-label-md font-bold text-on-surface">{t.name}</h3>
                      <p className="text-caption text-on-surface-variant">{t.title}</p>
                    </div>
                    {t.open && <Badge tone="verified">Terbuka</Badge>}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-md gap-y-1 text-caption text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <Icon name="location_on" size={14} /> {t.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="work_history" size={14} /> {t.exp}
                    </span>
                    <StarRating value={t.rating} size={14} />
                  </div>
                </div>
              </div>
              <div className="mt-md flex flex-wrap gap-sm">
                {t.skills.map((s) => (
                  <Badge key={s} tone="info">
                    {s}
                  </Badge>
                ))}
              </div>
              <div className="mt-md flex gap-sm">
                <Button variant="secondary" size="sm" icon="visibility" className="flex-1">
                  Lihat Profil
                </Button>
                <Button size="sm" icon="mail" className="flex-1">
                  Hubungi
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  options,
  defaultChecked = [],
}: {
  title: string;
  options: string[];
  defaultChecked?: string[];
}) {
  return (
    <div className="space-y-md">
      <h3 className="text-label-md font-bold uppercase tracking-wider text-on-surface">{title}</h3>
      <div className="space-y-sm">
        {options.map((opt) => (
          <Checkbox key={opt} label={opt} defaultChecked={defaultChecked.includes(opt)} />
        ))}
      </div>
    </div>
  );
}
