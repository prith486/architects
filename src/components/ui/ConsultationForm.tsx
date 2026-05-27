'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  projectScope: z.string().min(10, 'Please provide more details about the scope.'),
  estimatedBudget: z.string().min(1, 'Please select a budget range.')
});

type FormData = z.infer<typeof formSchema>;

const budgetOptions = [
  "Under $500k",
  "$500k - $1M",
  "$1M - $2.5M",
  "$2.5M+"
];

export default function ConsultationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      projectScope: '',
      estimatedBudget: ''
    }
  });

  const nextStep = async () => {
    let valid = false;
    if (step === 1) {
      valid = await trigger(['name', 'email']);
    } else if (step === 2) {
      valid = await trigger(['projectScope', 'estimatedBudget']);
    }
    
    if (valid) {
      setStep((prev) => prev + 1);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="max-w-3xl mx-auto p-10 md:p-14 border border-primary/20 bg-black/40 backdrop-blur-xl text-center shadow-[0_0_50px_rgba(212,175,55,0.08)] rounded-[2rem]"
      >
        <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-6 opacity-80" />
        <h3 className="text-3xl md:text-4xl font-playfair mb-4 tracking-wide">Experience <span className="italic text-primary">Initiated</span>.</h3>
        <p className="text-white/60 font-inter max-w-sm mx-auto leading-relaxed font-light text-sm">
          Thank you for reaching out. Our curation team will be in touch shortly to schedule your private consultation.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 md:p-12 lg:p-14 border border-primary/20 bg-[#050505]/80 backdrop-blur-xl shadow-[0_0_50px_rgba(212,175,55,0.05)] rounded-[2rem] relative overflow-hidden group transition-all duration-1000 hover:shadow-[0_0_60px_rgba(212,175,55,0.08)]">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none transition-opacity duration-1000 group-hover:opacity-70" />
      
      {/* Glint detail */}
      <div className="absolute top-10 right-10 md:top-14 md:right-14 text-primary/60">
        <Sparkles className="w-4 h-4 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-lg">
        <div className="mb-10">
          <p className="text-primary text-[10px] uppercase tracking-[0.2em] mb-6 flex items-center gap-3 opacity-80">
            <span>0{step}</span>
            <span className="text-primary/30">/</span>
            <span>{step === 1 ? 'INQUIRE' : 'DETAILS'}</span>
          </p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-playfair leading-[1.15] mb-8 tracking-wide">
            Let&apos;s create<br />
            something <span className="italic text-primary">timeless</span>.
          </h3>
          <div className="w-10 h-[1px] bg-primary/40" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-8"
              >
                <div className="relative">
                  <label className="block text-[9px] uppercase tracking-[0.15em] text-white/50 mb-2">Full Name</label>
                  <input
                    {...register('name')}
                    className="w-full bg-transparent border-b border-white/10 pb-2 text-white focus:outline-none focus:border-primary transition-colors duration-500 placeholder-white/20 font-light text-sm"
                    placeholder="Jane Doe"
                  />
                  {errors.name && <p className="text-red-400/80 text-xs mt-2">{errors.name.message}</p>}
                </div>
                
                <div className="relative">
                  <label className="block text-[9px] uppercase tracking-[0.15em] text-white/50 mb-2">Email Address</label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full bg-transparent border-b border-white/10 pb-2 text-white focus:outline-none focus:border-primary transition-colors duration-500 placeholder-white/20 font-light text-sm"
                    placeholder="jane@example.com"
                  />
                  {errors.email && <p className="text-red-400/80 text-xs mt-2">{errors.email.message}</p>}
                </div>

                <div className="pt-4 flex items-center gap-5 group/btn cursor-pointer w-max" onClick={nextStep}>
                  <div
                    className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary transition-all duration-500 group-hover/btn:bg-primary/5 group-hover/btn:border-primary/80 group-hover/btn:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  >
                    <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
                  </div>
                  <div>
                    <p className="text-primary text-[10px] uppercase tracking-[0.15em] font-medium mb-1">Next Step</p>
                    <p className="text-white/40 text-xs font-light transition-colors duration-500 group-hover/btn:text-white/60">Tell us about your project</p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-8"
              >
                <div className="relative">
                  <label className="block text-[9px] uppercase tracking-[0.15em] text-white/50 mb-2">Project Scope</label>
                  <textarea
                    {...register('projectScope')}
                    rows={1}
                    className="w-full bg-transparent border-b border-white/10 pb-2 text-white focus:outline-none focus:border-primary transition-colors duration-500 placeholder-white/20 resize-none font-light text-sm"
                    placeholder="Describe your vision..."
                  />
                  {errors.projectScope && <p className="text-red-400/80 text-xs mt-2">{errors.projectScope.message}</p>}
                </div>
                
                <div>
                  <label className="block text-[9px] uppercase tracking-[0.15em] text-white/50 mb-4">Estimated Budget</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {budgetOptions.map((budget) => (
                      <label key={budget} className="flex items-center gap-3 p-3 border border-white/5 hover:border-primary/30 transition-colors duration-500 cursor-pointer group/radio">
                        <input
                          type="radio"
                          value={budget}
                          {...register('estimatedBudget')}
                          className="accent-primary"
                        />
                        <span className="text-[11px] text-white/60 group-hover/radio:text-white transition-colors duration-500 tracking-wide font-light">{budget}</span>
                      </label>
                    ))}
                  </div>
                  {errors.estimatedBudget && <p className="text-red-400/80 text-xs mt-3">{errors.estimatedBudget.message}</p>}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-white/40 hover:text-white text-[9px] uppercase tracking-[0.15em] transition-colors duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-4 group/btn cursor-pointer"
                  >
                    <div className="text-right">
                      <p className="text-primary text-[10px] uppercase tracking-[0.15em] font-medium mb-1 transition-colors duration-500 group-hover/btn:text-primary">Submit</p>
                      <p className="text-white/40 text-xs font-light transition-colors duration-500 group-hover/btn:text-white/60">Begin consultation</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary transition-all duration-500 group-hover/btn:bg-primary/5 group-hover/btn:border-primary/80 group-hover/btn:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                      <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover/btn:translate-x-1" />
                    </div>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}

