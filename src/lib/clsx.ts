// Util kecil penggabung className (tanpa dependency tambahan).
export function clsx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
