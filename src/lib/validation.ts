import { z } from "zod";
import { PRODUCT_CATEGORY_KEYS } from "./constants";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(60).optional().or(z.literal("")),
  category: z.enum([...PRODUCT_CATEGORY_KEYS, "other"]),
  message: z.string().trim().min(10).max(3000),
  consent: z.literal(true),
  locale: z.enum(["de", "sr"]),
  /** Honeypot field: must stay empty. Bots that fill every input trip this. */
  companyWebsite: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
