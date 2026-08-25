"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { contactFormSchema, type ContactFormValues } from "@/lib/validation";
import { PRODUCT_CATEGORY_KEYS } from "@/lib/constants";
import { CONTACT } from "@/lib/constants";
import { useContactRequest } from "@/components/ContactRequestContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { gsap } from "@/lib/gsapClient";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const t = useTranslations("contact");
  const tForm = useTranslations("contact.form");
  const locale = useLocale() as "de" | "sr";
  const { category: requestedCategory } = useContactRequest();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const reducedMotion = useReducedMotion();
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      category: "baptismCandles",
      message: "",
      consent: false as unknown as true,
      locale,
      companyWebsite: "",
    },
  });

  useEffect(() => {
    if (requestedCategory) {
      setValue("category", requestedCategory);
      document.getElementById("contact-category")?.focus({ preventScroll: true });
    }
  }, [requestedCategory, setValue]);

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || submitState !== "success" || !successRef.current) return;
    const targets = successRef.current.querySelectorAll("[data-success-item]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.08 }
      );
    }, successRef);
    return () => ctx.revert();
  }, [reducedMotion, submitState]);

  useIsomorphicLayoutEffect(() => {
    if (reducedMotion || submitState !== "error" || !errorRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        errorRef.current,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }, errorRef);
    return () => ctx.revert();
  }, [reducedMotion, submitState]);

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error("request_failed");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  if (submitState === "success") {
    return (
      <section id="contact" className="relative bg-ink-900 py-24 md:py-32">
        <div ref={successRef} className="section-container flex flex-col items-center gap-6 text-center">
          <span data-success-item className="text-4xl">✦</span>
          <h2 data-success-item className="font-display text-3xl text-cream-50 sm:text-4xl">
            {tForm("successTitle")}
          </h2>
          <p data-success-item className="max-w-md text-cream-100/70">{tForm("successText")}</p>
          <Button
            data-success-item
            variant="ghost"
            onClick={() => {
              reset();
              setSubmitState("idle");
            }}
          >
            {tForm("sendAnother")}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative bg-ink-900 py-24 md:py-32">
      <div className="section-container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            align="left"
          />
          <div className="flex flex-col gap-5 border-t border-cream-100/10 pt-8">
            <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-gold-300">
              {t("info.title")}
            </h3>
            <dl className="flex flex-col gap-4 text-sm text-cream-100/75">
              <div>
                <dt className="text-cream-100/40">{t("info.addressLabel")}</dt>
                <dd>{CONTACT.addressLine}</dd>
              </div>
              <div>
                <dt className="text-cream-100/40">{t("info.phoneLabel")}</dt>
                <dd>
                  <a href={`tel:${CONTACT.phoneHref}`} className="hover:text-gold-200">
                    {CONTACT.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-cream-100/40">{t("info.emailLabel")}</dt>
                <dd>
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-gold-200">
                    {CONTACT.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-cream-100/40">{t("info.hoursLabel")}</dt>
                <dd>{t("info.hours")}</dd>
              </div>
            </dl>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-5 rounded-2xl border border-cream-100/[0.08] bg-cream-100/[0.02] p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              id="contact-name"
              label={tForm("name")}
              placeholder={tForm("namePlaceholder")}
              error={errors.name ? tForm("errors.name") : undefined}
              {...register("name")}
            />
            <Input
              id="contact-email"
              type="email"
              label={tForm("email")}
              placeholder={tForm("emailPlaceholder")}
              error={errors.email ? tForm("errors.email") : undefined}
              {...register("email")}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              id="contact-phone"
              type="tel"
              label={tForm("phone")}
              placeholder={tForm("phonePlaceholder")}
              {...register("phone")}
            />
            <Select
              id="contact-category"
              label={tForm("category")}
              error={errors.category ? tForm("errors.category") : undefined}
              {...register("category")}
            >
              {PRODUCT_CATEGORY_KEYS.map((key) => (
                <option key={key} value={key}>
                  {tForm(`categories.${key}`)}
                </option>
              ))}
              <option value="other">{tForm("categories.other")}</option>
            </Select>
          </div>

          <Textarea
            id="contact-message"
            label={tForm("message")}
            placeholder={tForm("messagePlaceholder")}
            error={errors.message ? tForm("errors.message") : undefined}
            {...register("message")}
          />

          <div
            aria-hidden="true"
            style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}
          >
            <label htmlFor="contact-company-website">Website</label>
            <input id="contact-company-website" tabIndex={-1} autoComplete="off" {...register("companyWebsite")} />
          </div>

          <label className="flex items-start gap-3 text-sm text-cream-100/65">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-cream-100/30 bg-transparent accent-gold-400"
              {...register("consent")}
            />
            <span>{tForm("consent")}</span>
          </label>
          {errors.consent && <p className="text-xs text-[#e08a97]">{tForm("errors.consent")}</p>}

          {submitState === "error" && (
            <div
              ref={errorRef}
              className="rounded-lg border border-wine-500/50 bg-wine-600/10 p-4 text-sm text-cream-100/80"
            >
              <p className="font-medium text-[#e08a97]">{tForm("errorTitle")}</p>
              <p>{tForm("errorText")}</p>
            </div>
          )}

          <Button type="submit" disabled={submitState === "submitting"} className="mt-2 self-start">
            {submitState === "submitting" ? tForm("submitting") : tForm("submit")}
          </Button>
        </form>
      </div>
    </section>
  );
}
