"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Mail, CheckCircle2 } from "lucide-react";

// Zod Schema for Micro-Commitment
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const [bookingMode, setBookingMode] = useState<"form" | "calendly">("form");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // API Route integration goes here later
    console.log("Consultation Requested:", data);
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative w-full max-w-[1400px] mx-auto px-6 py-32 border-t border-black/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        
        <div className="flex flex-col z-10">
          <h2 className="text-5xl md:text-7xl font-serif text-[#1a1a1a] leading-tight mb-6">
            Let's discuss <br />
            <span className="text-[#b7955b] italic">your vision.</span>
          </h2>
          
          <div className="flex gap-12 mt-8">
            <div>
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#b7955b] block mb-2">Studio</span>
              <p className="font-sans text-[#5c5c5c] leading-relaxed">Pune, Maharashtra<br/>India</p>
            </div>
            <div>
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#b7955b] block mb-2">Inquiries</span>
              <p className="font-sans text-[#5c5c5c] leading-relaxed">hello@vaastu-studio.com<br/>+91 98765 43210</p>
            </div>
          </div>
        </div>

        
        <div className="relative z-10 bg-white/40 backdrop-blur-md border border-black/5 p-10 lg:p-14 shadow-xl">
          
          
          <div className="flex gap-6 mb-10 border-b border-black/10 pb-6">
            <button
              onClick={() => setBookingMode("form")}
              className={`flex items-center gap-2 font-sans text-xs tracking-widest uppercase transition-colors ${
                bookingMode === "form" ? "text-[#b7955b]" : "text-[#1a1a1a]/40 hover:text-[#1a1a1a]"
              }`}
            >
              <Mail size={16} /> Request Info
            </button>
            <button
              onClick={() => setBookingMode("calendly")}
              className={`flex items-center gap-2 font-sans text-xs tracking-widest uppercase transition-colors ${
                bookingMode === "calendly" ? "text-[#b7955b]" : "text-[#1a1a1a]/40 hover:text-[#1a1a1a]"
              }`}
            >
              <Calendar size={16} /> Book Consult
            </button>
          </div>

          
          <div className="min-h-[250px] relative">
            <AnimatePresence mode="wait">
              
              
              {bookingMode === "form" && !isSubmitted && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-8"
                >
                  <div className="relative group">
                    <input
                      {...register("name")}
                      type="text"
                      placeholder=" "
                      className="w-full bg-transparent border-b border-black/20 py-3 text-[#1a1a1a] font-sans text-lg outline-none focus:border-[#b7955b] transition-colors peer"
                    />
                    <label className="absolute left-0 top-3 text-[#1a1a1a]/50 font-sans text-lg transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-[#b7955b] peer-focus:tracking-widest peer-focus:uppercase peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#b7955b] peer-not-placeholder-shown:tracking-widest peer-not-placeholder-shown:uppercase cursor-text">
                      Your Name
                    </label>
                    {errors.name && <span className="text-red-500 text-xs mt-2 block">{errors.name.message}</span>}
                  </div>

                  <div className="relative group">
                    <input
                      {...register("email")}
                      type="email"
                      placeholder=" "
                      className="w-full bg-transparent border-b border-black/20 py-3 text-[#1a1a1a] font-sans text-lg outline-none focus:border-[#b7955b] transition-colors peer"
                    />
                    <label className="absolute left-0 top-3 text-[#1a1a1a]/50 font-sans text-lg transition-all peer-focus:-top-5 peer-focus:text-xs peer-focus:text-[#b7955b] peer-focus:tracking-widest peer-focus:uppercase peer-not-placeholder-shown:-top-5 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-[#b7955b] peer-not-placeholder-shown:tracking-widest peer-not-placeholder-shown:uppercase cursor-text">
                      Email Address
                    </label>
                    {errors.email && <span className="text-red-500 text-xs mt-2 block">{errors.email.message}</span>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 self-start flex items-center gap-3 bg-[#1a1a1a] text-white px-8 py-4 font-sans text-xs tracking-widest uppercase hover:bg-[#b7955b] transition-all disabled:opacity-50 group"
                  >
                    {isSubmitting ? "Processing..." : "Initiate Contact"}
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
                  </button>
                </motion.form>
              )}

              
              {bookingMode === "form" && isSubmitted && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-[200px] text-center"
                >
                  <CheckCircle2 className="text-[#b7955b] mb-4" size={32} />
                  <h3 className="font-serif text-2xl text-[#1a1a1a] mb-2">Request Received</h3>
                  <p className="font-sans text-[#5c5c5c] text-sm">Our lead architect will contact you shortly.</p>
                </motion.div>
              )}

              
              {bookingMode === "calendly" && (
                <motion.div
                  key="calendly"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-[250px] bg-white/20 border border-black/5 flex flex-col items-center justify-center"
                >
                  <Calendar className="text-[#b7955b] mb-4 opacity-50" size={32} />
                  <p className="font-sans text-xs tracking-widest uppercase text-[#1a1a1a]/60 mb-2">Select a Time</p>
                  <p className="font-sans text-xs text-[#1a1a1a]/40 italic">Calendly embed renders here</p>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
