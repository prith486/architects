"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, BookOpen, ArrowRight, CheckCircle2, MessageCircle, Mail, Plus } from "lucide-react";
import {
  CONTACT_FOOTER_FALLBACK,
  mapContactFooterData,
  type ContactFooterData,
  type SanityContactFooterDocument,
} from "@/sanity/lib/contactFooterMapper";
import { client } from "@/sanity/lib/client";
import { contactFooterQuery } from "@/sanity/lib/queries";

type LeadFormData = {
  email: string;
};

export default function LeadMagnetWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactContent, setContactContent] = useState<ContactFooterData>(CONTACT_FOOTER_FALLBACK);
  const content = contactContent.leadMagnet;
  const leadSchema = z.object({
    email: z.string().email(content.validationMessage),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
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
        console.warn('Sanity lead magnet fetch failed. Using hardcoded fallback.', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Only show the widget when entering the About section
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about-wrapper");
      if (aboutSection && !isSubmitted) {
        // Trigger when the about section comes into view (mid-screen)
        if (window.scrollY >= aboutSection.offsetTop - window.innerHeight / 2) {
          setIsVisible(true);
        } else {
          // Hide it if we scroll back up above the about section
          setIsVisible(false);
        }
      }
    };

    // Check initially in case they reload down the page
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSubmitted]);

  const onSubmit = async (data: LeadFormData) => {
    // TODO: Connect to backend/CRM later
    console.log("Lead Captured:", data.email);
    setIsSubmitted(true);

    // Auto-close the widget completely after 3 seconds of success state
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence mode="wait">

        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-[340px] bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 shadow-2xl p-6 rounded-sm relative"
          >

            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>

            {!isSubmitted ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full border border-[#b7955b]/30 flex items-center justify-center bg-[#b7955b]/10">
                    <BookOpen className="text-[#b7955b]" size={14} />
                  </div>
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#b7955b]">{content.eyebrow}</span>
                </div>

                <h4 className="font-serif text-xl text-white mb-2 leading-tight">
                  {content.heading}
                </h4>
                <p className="font-sans text-xs text-white/60 mb-6 font-light leading-relaxed">
                  {content.description}
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                  <div>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder={content.emailPlaceholder}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white font-sans outline-none focus:border-[#b7955b] transition-colors rounded-sm placeholder:text-white/30"
                    />
                    {errors.email && (
                      <span className="text-red-400 text-[10px] mt-1 block">{errors.email.message}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 font-sans text-xs tracking-widest uppercase hover:bg-[#b7955b] hover:text-white transition-all disabled:opacity-50 group rounded-sm"
                  >
                    {isSubmitting ? content.submittingText : content.submitText}
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
                  </button>
                </form>
              </>
            ) : (
              /* --- SUCCESS STATE --- */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-8 flex flex-col items-center justify-center text-center"
              >
                <CheckCircle2 className="text-[#b7955b] mb-4" size={32} />
                <h4 className="font-serif text-lg text-white mb-2">{content.successHeading}</h4>
                <p className="font-sans text-xs text-white/60">{content.successDescription}</p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* --- SPEED DIAL MENU + FLOATING BUTTON --- */
          <div className="relative flex flex-col items-center">
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  className="flex flex-col gap-3 absolute bottom-full pb-4 z-0"
                >
                  <a href={content.whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center hover:bg-[#b7955b]/20 hover:border-[#b7955b]/50 transition-all group shadow-xl relative" title="WhatsApp">
                    <MessageCircle size={18} className="text-white/70 group-hover:text-[#b7955b] transition-colors" />
                  </a>
                  <a href={`mailto:${contactContent.email}`} className="w-12 h-12 bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center hover:bg-[#b7955b]/20 hover:border-[#b7955b]/50 transition-all group shadow-xl relative" title="Email Us">
                    <Mail size={18} className="text-white/70 group-hover:text-[#b7955b] transition-colors" />
                  </a>
                  <button onClick={() => { setIsExpanded(true); setIsMenuOpen(false); }} className="w-12 h-12 bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#b7955b]/30 rounded-full flex items-center justify-center hover:bg-[#b7955b]/20 hover:border-[#b7955b]/50 transition-all group shadow-xl relative" title="Exclusive Asset">
                    <BookOpen size={18} className="text-[#b7955b] group-hover:text-white transition-colors" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              key="minimized"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                boxShadow: isMenuOpen ? '0px 0px 0px rgba(183,149,91,0)' : ['0px 0px 0px rgba(183,149,91,0)', '0px 0px 25px rgba(183,149,91,0.6)', '0px 0px 0px rgba(183,149,91,0)']
              }}
              transition={{
                boxShadow: { repeat: Infinity, duration: 2, ease: "easeInOut" }
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-14 h-14 bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#b7955b]/40 rounded-full flex items-center justify-center group relative z-10"
            >
              <motion.div animate={{ rotate: isMenuOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
                {isMenuOpen ? (
                  <Plus className="text-[#b7955b] transition-colors" size={24} />
                ) : (
                  <BookOpen className="text-[#b7955b] group-hover:text-white transition-colors" size={20} />
                )}
              </motion.div>

              {!isMenuOpen && (
                <span className="absolute top-0 right-0 flex h-3.5 w-3.5 -mt-0.5 -mr-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b7955b] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#b7955b] border-2 border-[#0a0a0a]"></span>
                </span>
              )}
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
