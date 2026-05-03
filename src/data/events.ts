// AUTO-GENERATED FROM SANITY. Edit content via Sanity Studio (collection "Jadwal Acara").
// Run `npm run sanity:sync` to refresh from Sanity.

export type EventCategory =
  | "pertunjukan"
  | "workshop"
  | "festival"
  | "diskusi"
  | "lainnya";

export type SatyantaraEvent = {
  slug: string;
  title: string;
  category: EventCategory;
  startDate: string; // ISO 8601
  endDate?: string;
  location: string;
  description: string;
  registrationUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  isFeatured?: boolean;
};

export const eventCategoryLabels: Record<EventCategory, string> = {
  pertunjukan: "Pertunjukan Wayang",
  workshop: "Workshop",
  festival: "Festival",
  diskusi: "Diskusi & Talkshow",
  lainnya: "Lainnya",
};

export const events: SatyantaraEvent[] = [];
