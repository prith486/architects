"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import {
  CONTACT_FOOTER_FALLBACK,
  mapContactFooterData,
  type ContactFooterData,
  type SanityContactFooterDocument,
} from "@/sanity/lib/contactFooterMapper";
import { client } from "@/sanity/lib/client";
import { contactFooterQuery } from "@/sanity/lib/queries";

type ExitFormData = {
  email: string;
};

export default function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactContent, setContactContent] = useState<ContactFooterData>(CONTACT_FOOTER_FALLBACK);
  const content = contactContent.exitIntent;
  const exitSchema = z.object({
    email: z.string().email(content.validationMessage),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ExitFormData>({
    resolver: zodResolver(exitSchema),
  });

  useEffect(() => {
    let isMounted = true;

    client
      .fetch<SanityContactFooterDocument | null>(contactFooterQuery)
      .then((document) => {
        if (isMounted) {
          setContactContent(mapContactFooterData(document));
        }
      })
      .catch((error) => {
        console.warn('Sanity exit intent fetch failed. Using hardcoded fallback.', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // Only run on desktop (hover/mouse exists)
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if cursor leaves the top of the viewport and it hasn't triggered yet
      if (e.clientY <= 0 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true); // Ensure it only annoys them once per session
      }
    };

    // Optional: Only attach the listener after they've been on the site for a few seconds
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasTriggered]);

  const onSubmit = async (data: ExitFormData) => {
    // API Route integration to save email and send the asset
    console.log("Exit Intent Captured:", data.email);
    setIsSubmitted(true);

    // Auto-close after success
    setTimeout(() => {
      setIsVisible(false);
    }, 3500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-6">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            onClick={() => setIsVisible(false)}
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl p-10 md:p-16 flex flex-col items-center text-center rounded-sm overflow-hidden"
          >

            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#b7955b]/10 blur-[100px] rounded-full pointer-events-none" />

            {!isSubmitted ? (
              <div className="relative z-10 w-full">
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 rounded-full border border-[#b7955b]/30 flex items-center justify-center bg-[#b7955b]/10">
                    <Lock className="text-[#b7955b]" size={20} />
                  </div>
                </div>

                <span className="font-sans text-xs tracking-[0.2em] uppercase text-[#b7955b] block mb-4">
                  {content.eyebrow}
                </span>

                <h2 className="font-serif text-4xl md:text-5xl text-white mb-4 leading-tight">
                  {content.heading.split(/\r?\n/).map((line, index, lines) => (
                    <span key={`${line}-${index}`}>
                      {line}
                      {index < lines.length - 1 && <br className="hidden md:block" />}
                    </span>
                  ))}
                </h2>

                <p className="font-sans text-white/60 mb-10 font-light max-w-md mx-auto">
                  {content.description}
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mx-auto flex flex-col gap-4">
                  <div className="relative">
                    <input
                      {...register("email")}
                      type="email"
                      placeholder={content.emailPlaceholder}
                      className="w-full bg-white/5 border border-white/20 py-4 px-6 text-white font-sans outline-none focus:border-[#b7955b] transition-colors rounded-sm placeholder:text-white/30 text-center"
                    />
                    {errors.email && (
                      <span className="text-red-400 text-xs mt-2 absolute -bottom-6 left-0 w-full text-center">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 bg-white text-black px-8 py-4 font-sans text-xs tracking-widest uppercase hover:bg-[#b7955b] hover:text-white transition-all disabled:opacity-50 group rounded-sm"
                  >
                    {isSubmitting ? content.submittingText : content.submitText}
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                  </button>
                </form>

                <button
                  onClick={() => setIsVisible(false)}
                  className="mt-6 text-white/40 hover:text-white font-sans text-xs transition-colors border-b border-transparent hover:border-white/40 pb-1"
                >
                  {content.closeText}
                </button>
              </div>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative z-10 py-12 flex flex-col items-center justify-center text-center w-full"
              >
                <CheckCircle2 className="text-[#b7955b] mb-6" size={56} />
                <h3 className="font-serif text-3xl text-white mb-3">{content.successHeading}</h3>
                <p className="font-sans text-white/60 font-light max-w-sm mx-auto">
                  {content.successDescription}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
