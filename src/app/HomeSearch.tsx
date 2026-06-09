'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/ui/Button';

/** Kotak pencarian hero di beranda. Mengarahkan ke /lowongan dengan kata kunci. */
export function HomeSearch() {
  const router = useRouter();
  const [keyword, setKeyword] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const q = keyword.trim();
        router.push(q ? `/lowongan?q=${encodeURIComponent(q)}` : '/lowongan');
      }}
      className="flex flex-col gap-2 rounded-xl bg-surface-container-lowest p-2 shadow-level-2 sm:flex-row"
    >
      <label className="flex flex-1 items-center gap-2 px-md">
        <Icon name="search" className="text-outline" />
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full border-0 bg-transparent py-3 text-body-md outline-none placeholder:text-on-surface-variant"
          placeholder="Posisi, perusahaan, atau jasa"
          aria-label="Kata kunci pencarian"
        />
      </label>
      <Button type="submit" size="lg" icon="search">
        Cari
      </Button>
    </form>
  );
}
