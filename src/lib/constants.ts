export const SITE_NAME = "Sveta Loza";

export const CONTACT = {
  email: "kontakt@svetaloza-beispiel.rs",
  phone: "+381 11 234 5678",
  phoneHref: "+381112345678",
  addressLine: "Kneza Miloša 24, 11000 Beograd, Srbija",
} as const;

export const PRODUCT_CATEGORY_KEYS = [
  "baptismCandles",
  "weddingCandles",
  "weddingTowels",
  "baptismAccessories",
  "slavaDecor",
  "giftware",
] as const;

export type ProductCategoryKey = (typeof PRODUCT_CATEGORY_KEYS)[number];

export const NAV_SECTION_IDS = {
  candle: "candle",
  peskir: "peskir",
  products: "products",
  story: "story",
  contact: "contact",
} as const;
