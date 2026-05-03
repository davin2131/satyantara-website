import type { WeekDay } from "@/data/products";

const DAY_INDEX: Record<WeekDay, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

const SHORT_ID_DAY = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"] as const;
const LONG_ID_DAY = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
] as const;
const ID_MONTH = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
] as const;
const ID_MONTH_LONG = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
] as const;

export type BookingDateOption = {
  /** ISO date string (YYYY-MM-DD), used as the canonical key. */
  iso: string;
  /** Compact label, e.g. "Sab, 3 Mei 2026". */
  shortLabel: string;
  /** Full label, e.g. "Sabtu, 3 Mei 2026". */
  longLabel: string;
};

const DEFAULT_AVAILABLE_DAYS: WeekDay[] = ["saturday", "sunday"];
const DEFAULT_BOOKING_WEEKS = 4;

function toIsoDate(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatShortIndo(d: Date): string {
  return `${SHORT_ID_DAY[d.getDay()]}, ${d.getDate()} ${ID_MONTH[d.getMonth()]} ${d.getFullYear()}`;
}

function formatLongIndo(d: Date): string {
  return `${LONG_ID_DAY[d.getDay()]}, ${d.getDate()} ${ID_MONTH_LONG[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * Parse a YYYY-MM-DD ISO date as a local date (not UTC), avoiding timezone
 * shifts that would push e.g. a Saturday into Friday.
 */
export function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map((p) => Number.parseInt(p, 10));
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function formatIsoDateShort(iso: string): string {
  return formatShortIndo(parseIsoDate(iso));
}

export function formatIsoDateLong(iso: string): string {
  return formatLongIndo(parseIsoDate(iso));
}

/**
 * Generate a list of bookable dates starting from today, restricted to the
 * given days-of-week, looking ahead `weeks` weeks.
 */
export function generateBookingDates(opts?: {
  availableDays?: WeekDay[];
  weeks?: number;
  from?: Date;
}): BookingDateOption[] {
  const days =
    opts?.availableDays && opts.availableDays.length > 0
      ? opts.availableDays
      : DEFAULT_AVAILABLE_DAYS;
  const weeks = opts?.weeks && opts.weeks > 0 ? opts.weeks : DEFAULT_BOOKING_WEEKS;
  const start = opts?.from ?? new Date();
  // Normalize to start of day (local).
  const cursor = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
  );

  const allowed = new Set(days.map((d) => DAY_INDEX[d]));
  const totalDays = weeks * 7;
  const result: BookingDateOption[] = [];

  for (let i = 0; i < totalDays; i++) {
    if (allowed.has(cursor.getDay())) {
      result.push({
        iso: toIsoDate(cursor),
        shortLabel: formatShortIndo(cursor),
        longLabel: formatLongIndo(cursor),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return result;
}
