import Link from 'next/link';
import type { Job } from '@/lib/data';
import { Icon } from '../Icon';
import { Badge, VerifiedBadge } from '../ui/Badge';
import { Placeholder } from '../Placeholder';

export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/lowongan/${job.id}`}
      className="group block rounded-xl border border-outline-variant bg-surface-container-lowest p-lg transition-[transform,border-color,box-shadow] duration-200 ease-out-quint hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-level-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="flex flex-col gap-lg sm:flex-row">
        <Placeholder
          icon="apartment"
          color={job.logoColor}
          label={`Logo ${job.company}`}
          className="h-16 w-16 flex-shrink-0"
        />
        <div className="flex-1 space-y-sm">
          <div className="flex items-start justify-between gap-md">
            <div>
              <h3 className="text-title-lg text-on-surface transition-colors group-hover:text-primary">
                {job.title}
              </h3>
              <p className="text-body-md text-on-surface-variant">{job.company}</p>
            </div>
            <span
              aria-hidden
              className="rounded-full p-2 text-outline transition-colors group-hover:text-primary"
            >
              <Icon name="bookmark" />
            </span>
          </div>
          <div className="flex flex-wrap gap-sm">
            <Badge tone="neutral" icon="location_on">
              {job.location}
            </Badge>
            <Badge tone="type">{job.type}</Badge>
            {job.remote && <Badge tone="neutral">Remote</Badge>}
            {job.verified && <VerifiedBadge />}
          </div>
          <p className="text-label-md font-semibold text-on-surface tabular-nums">{job.salary}</p>
        </div>
      </div>
      <div className="mt-md flex items-center justify-between border-t border-outline-variant pt-md">
        <span className="text-caption text-on-surface-variant">Diposting {job.postedAgo}</span>
        <span className="text-label-md font-semibold text-primary">Lihat detail →</span>
      </div>
    </Link>
  );
}
