import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Sparkles, BrainCircuit, Loader2 } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface ProjectEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const ProjectEnquiryModal: React.FC<ProjectEnquiryModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(preselectedService || 'Web Development');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // AI Project Advisor state
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPlan, setAiPlan] = useState<{
    techStack: string[];
    phases: { step: string; description: string }[];
  } | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!description.trim()) errs.description = 'Please describe your project';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate real submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleAiGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setAiLoading(true);
    setTimeout(() => {
      // Intelligent recommendation based on user's query
      const lower = aiPrompt.toLowerCase();
      let stack = ['React', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'];
      if (lower.includes('mobile') || lower.includes('app') || lower.includes('ios')) {
        stack = ['React Native', 'Flutter', 'Fastlane', 'Node.js', 'Supabase'];
      } else if (lower.includes('game') || lower.includes('3d') || lower.includes('unity')) {
        stack = ['Three.js', 'Unity WebGL', 'WebSockets', 'Go Server', 'Docker'];
      } else if (lower.includes('ai') || lower.includes('llm') || lower.includes('agent')) {
        stack = ['Next.js', 'OpenAI API', 'LangChain', 'Pinecone Vector DB', 'Python / FastAPI'];
      }

      setAiPlan({
        techStack: stack,
        phases: [
          {
            step: 'Phase 1: Architecture & UI Prototype',
            description: 'Wireframing in Figma, defining API contracts, and establishing system benchmarks.',
          },
          {
            step: 'Phase 2: Core Engine & Frontend',
            description: 'Building high-performance UI components with optimized client-side state.',
          },
          {
            step: 'Phase 3: Integration & QA Stress Testing',
            description: 'End-to-end integration, performance audit, and sub-100ms response targets.',
          },
          {
            step: 'Phase 4: Global Deployment & Scale',
            description: 'Vercel / AWS edge hosting setup with automated CI/CD and monitoring.',
          },
        ],
      });
      setAiLoading(false);
    }, 1200);
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setCompany('');
    setDescription('');
    setIsSubmitted(false);
    setErrors({});
    setAiPlan(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-background border border-border rounded-[2.5rem] p-6 md:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>

            {isSubmitted ? (
              <div className="text-center py-12 px-4 flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                  className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6"
                >
                  <CheckCircle2 size={48} />
                </motion.div>
                <h3 className="text-3xl md:text-4xl font-black font-headline mb-4">
                  Enquiry Received!
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
                  Thank you for reaching out to Prospira. A technical partner will review your requirements
                  and respond with a proposal within 24 business hours.
                </p>
                <button
                  onClick={() => {
                    resetForm();
                    onClose();
                  }}
                  className="px-8 py-3.5 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-md"
                >
                  Return to Website
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-8">
                  <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">
                    Direct Project Enquiry
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black font-headline tracking-tighter">
                    Let&apos;s Build Together
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base mt-2">
                    Fill out your project specifications or consult our AI Advisor for an instant technical roadmap.
                  </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left Form (7 cols) */}
                  <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-foreground/70 block mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Alex Morgan"
                          className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                        />
                        {errors.fullName && (
                          <span className="text-xs text-red-500 mt-1 block">{errors.fullName}</span>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-foreground/70 block mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@company.com"
                          className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                        />
                        {errors.email && (
                          <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-foreground/70 block mb-1">
                          Company Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Acme Corp"
                          className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-foreground/70 block mb-1">
                          Required Service
                        </label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                        >
                          <option value="Web Development">Web Development</option>
                          <option value="Web Applications">Web Applications (SaaS)</option>
                          <option value="Mobile Apps">Mobile Applications (iOS/Android)</option>
                          <option value="Game Development">Game Development (2D/3D)</option>
                          <option value="AI Automation">AI Solutions & Automation</option>
                          <option value="UI/UX Design">UI/UX Strategy & Design</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-foreground/70 block mb-1">
                        Project Description *
                      </label>
                      <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your vision, goals, target audience, and preferred launch timeline..."
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-foreground resize-none"
                      />
                      {errors.description && (
                        <span className="text-xs text-red-500 mt-1 block">{errors.description}</span>
                      )}
                    </div>

                    <MagneticButton
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>
                          Submit Project Enquiry <Send size={18} />
                        </>
                      )}
                    </MagneticButton>
                  </form>

                  {/* Right: AI Project Advisor (5 cols) */}
                  <div className="lg:col-span-5 bg-secondary text-white p-6 rounded-3xl border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-36 h-36 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex items-center gap-2 mb-3">
                      <BrainCircuit className="text-primary w-6 h-6" />
                      <h3 className="font-headline font-bold text-lg">AI Project Advisor</h3>
                    </div>
                    <p className="text-xs text-white/70 mb-4 leading-relaxed">
                      Need immediate architecture recommendations? Describe what you want to build:
                    </p>

                    <div className="space-y-3">
                      <textarea
                        rows={3}
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="e.g. A real-time collaboration dashboard for remote design teams..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-white/30"
                      />

                      <button
                        type="button"
                        onClick={handleAiGenerate}
                        disabled={aiLoading || !aiPrompt.trim()}
                        className="w-full py-2.5 bg-primary text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-md"
                      >
                        {aiLoading ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <>
                            <Sparkles size={14} /> Generate Roadmap
                          </>
                        )}
                      </button>
                    </div>

                    {/* AI Output preview */}
                    {aiPlan && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 pt-4 border-t border-white/10 space-y-3"
                      >
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">
                            Recommended Tech Stack:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {aiPlan.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white/90"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">
                            Key Milestones:
                          </span>
                          <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                            {aiPlan.phases.map((p, idx) => (
                              <div key={idx} className="text-[10px] text-white/80">
                                <span className="font-bold text-white">{p.step}: </span>
                                {p.description}
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setDescription((prev) =>
                              prev
                                ? `${prev}\n\n[AI Recommendations]\nTech: ${aiPlan.techStack.join(
                                    ', '
                                  )}\nIdea: ${aiPrompt}`
                                : `[AI Recommendations]\nTech: ${aiPlan.techStack.join(
                                    ', '
                                  )}\nIdea: ${aiPrompt}`
                            );
                          }}
                          className="w-full py-1.5 text-[11px] text-primary hover:underline font-bold text-center block"
                        >
                          + Insert into Enquiry Form
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectEnquiryModal;
