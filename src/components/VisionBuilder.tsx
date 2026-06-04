"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mountain, Waves, Building2, Home, Building, Castle, Box, Feather, Landmark, ArrowRight, CheckCircle2 } from "lucide-react";

// Email capture schema for the final step
const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
type EmailFormData = z.infer<typeof emailSchema>;

// Data structures for the choices
const STEPS = [
  {
    title: "Select your terrain.",
    options: [
      { id: "urban", label: "Urban Plot", icon: Building2 },
      { id: "hillside", label: "Hillside", icon: Mountain },
      { id: "waterfront", label: "Waterfront", icon: Waves },
    ]
  },
  {
    title: "Determine the scale.",
    options: [
      { id: "minimalist", label: "Minimalist Retreat", icon: Home },
      { id: "estate", label: "Grand Estate", icon: Castle },
      { id: "commercial", label: "Commercial Space", icon: Building },
    ]
  },
  {
    title: "Define the aesthetic.",
    options: [
      { id: "brutalist", label: "Raw Brutalism", icon: Box },
      { id: "warm_modern", label: "Warm Modernism", icon: Feather },
      { id: "classic", label: "Timeless Classic", icon: Landmark },
    ]
  }
];

export default function VisionBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({ terrain: "", scale: "", aesthetic: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const handleSelect = (optionId: string) => {
    const keys = ["terrain", "scale", "aesthetic"];
    setSelections({ ...selections, [keys[currentStep]]: optionId });
    
    // Auto-advance after a short delay for smoothness
    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 400);
  };

  const onSubmit = async (data: EmailFormData) => {
    // API Route integration goes here later (saving selections + email)
    console.log("Vision Profile:", { ...selections, email: data.email });
    setIsSubmitted(true);
  };

  return (
    <section id="vision-builder" className="relative w-full min-h-screen flex items-center justify-center py-48 bg-[#FCFAF7] z-20 border-y border-black/10">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="bg-white shadow-2xl p-10 lg:p-16 rounded-sm min-h-[600px] flex flex-col justify-center">
          
          <div className="text-center mb-12">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#b7955b] mb-4 block">Interactive Profile</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a]">Build your vision.</h2>
            
            {!isSubmitted && (
              <div className="flex justify-center gap-2 mt-8">
                {[0, 1, 2, 3].map((stepIndex) => (
                  <div 
                    key={stepIndex} 
                    className={`h-1 w-12 transition-colors duration-500 ${
                      stepIndex <= currentStep ? "bg-[#b7955b]" : "bg-black/10"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="relative flex-1 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              
              {currentStep < 3 && !isSubmitted && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <h3 className="text-2xl font-serif text-[#1a1a1a] text-center mb-12">{STEPS[currentStep].title}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {STEPS[currentStep].options.map((option) => {
                      const Icon = option.icon;
                      const isSelected = Object.values(selections).includes(option.id);
                      
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSelect(option.id)}
                          className={`flex flex-col items-center justify-center gap-6 p-10 border transition-all duration-300 group ${
                            isSelected 
                              ? "border-[#b7955b] bg-[#b7955b]/5 shadow-lg" 
                              : "border-black/10 hover:border-[#b7955b]/50 bg-transparent hover:shadow-md"
                          }`}
                        >
                          <Icon className={`${isSelected ? "text-[#b7955b]" : "text-[#1a1a1a]/40"} group-hover:text-[#b7955b] transition-colors`} size={48} />
                          <span className={`font-sans text-base tracking-widest uppercase ${isSelected ? "text-[#b7955b]" : "text-[#1a1a1a]/60 group-hover:text-[#1a1a1a]"}`}>
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && !isSubmitted && (
                <motion.div
                  key="capture"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-md text-center mx-auto"
                >
                  <h3 className="text-2xl font-serif text-[#1a1a1a] mb-4">Your profile is ready.</h3>
                  <p className="font-sans text-[#5c5c5c] text-sm leading-relaxed mb-8">
                    Enter your email to generate a custom lookbook featuring floorplans and concepts matching your exact parameters.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="relative">
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="Email Address"
                        className="w-full bg-transparent border-b border-black/20 py-4 text-[#1a1a1a] font-sans text-lg outline-none focus:border-[#b7955b] transition-colors"
                      />
                      {errors.email && <span className="text-red-500 text-xs mt-2 absolute -bottom-5 left-0">{errors.email.message}</span>}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-6 flex items-center justify-center gap-3 bg-[#1a1a1a] text-white px-8 py-5 font-sans text-sm tracking-widest uppercase hover:bg-[#b7955b] transition-all disabled:opacity-50 group"
                    >
                      {isSubmitting ? "Generating..." : "View My Portfolio"}
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                    </button>
                  </form>
                </motion.div>
              )}

              {isSubmitted && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 w-full"
                >
                  <CheckCircle2 className="text-[#b7955b] mb-6" size={64} />
                  <h3 className="text-3xl md:text-4xl font-serif text-[#1a1a1a] mb-4">Check your inbox.</h3>
                  <p className="font-sans text-[#5c5c5c] text-lg">Your custom architectural lookbook is on its way.</p>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
