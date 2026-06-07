'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/**
 * Mock auth front-end (belum ada backend). Menyimpan sesi peran di localStorage
 * supaya tiga pengalaman (Pencari Kerja / Seller / Rekruter) bisa dijelajahi
 * secara fungsional. Saat API siap, ganti login/logout dengan panggilan nyata.
 */
export type Role = 'pencari' | 'seller' | 'rekruter';

export interface AuthUser {
  name: string;
  email: string;
  role: Role;
}

export const roleMeta: Record<
  Role,
  { label: string; short: string; home: string; icon: string; desc: string }
> = {
  pencari: {
    label: 'Pencari Kerja',
    short: 'Pencari',
    home: '/profil',
    icon: 'person_search',
    desc: 'Lamar lowongan & beli jasa karir.',
  },
  seller: {
    label: 'Seller Jasa',
    short: 'Seller',
    home: '/dashboard/seller',
    icon: 'storefront',
    desc: 'Jual jasa karir & kelola pesanan.',
  },
  rekruter: {
    label: 'Rekruter',
    short: 'Rekruter',
    home: '/dashboard/rekruter',
    icon: 'business_center',
    desc: 'Pasang lowongan & cari talenta.',
  },
};

/** Nama contoh per peran - selaras dengan data dummy dashboard. */
export const defaultNameByRole: Record<Role, string> = {
  pencari: 'Rina Hapsari',
  seller: 'Dewi Lestari',
  rekruter: 'PT. Teknologi Masa Depan',
};

const STORAGE_KEY = 'karirhub-auth';

interface AuthContextValue {
  user: AuthUser | null;
  /** false sampai localStorage selesai dibaca (hindari flicker / mismatch). */
  ready: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  /** Ganti peran aktif tanpa logout (Model A: satu akun, banyak peran/mode). */
  switchRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as AuthUser);
    } catch {
      /* localStorage tak tersedia - abaikan, mulai sebagai tamu */
    }
    setReady(true);
  }, []);

  const login = useCallback((next: AuthUser) => {
    setUser(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* abaikan */
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* abaikan */
    }
  }, []);

  const switchRole = useCallback((role: Role) => {
    setUser((prev) => {
      if (!prev || prev.role === role) return prev;
      const next = { ...prev, role };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* abaikan */
      }
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, ready, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth harus dipakai di dalam <AuthProvider>');
  return ctx;
}
