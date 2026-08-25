"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ProductCategoryKey } from "@/lib/constants";

type ContactRequestContextValue = {
  category: ProductCategoryKey | null;
  requestCategory: (category: ProductCategoryKey) => void;
};

const ContactRequestContext = createContext<ContactRequestContextValue | null>(null);

export function ContactRequestProvider({ children }: { children: React.ReactNode }) {
  const [category, setCategory] = useState<ProductCategoryKey | null>(null);

  const value = useMemo(
    () => ({
      category,
      requestCategory: (c: ProductCategoryKey) => setCategory(c),
    }),
    [category]
  );

  return <ContactRequestContext.Provider value={value}>{children}</ContactRequestContext.Provider>;
}

export function useContactRequest() {
  const ctx = useContext(ContactRequestContext);
  if (!ctx) {
    throw new Error("useContactRequest must be used within ContactRequestProvider");
  }
  return ctx;
}
