import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Sparkles, Send, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import { MagneticButton } from '../components/MagneticButton';

export const ContactPage: React.FC = () => {
  // Contact Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // AI Advisor state
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<{
    techStack: string[];
    phases: { step: string; description: string }[];
  } | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Your name is required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Valid email is required';
    }
    if (!message.trim()) errs.message = 'Please provide details about your project';

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleAiAdvisor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setAiLoading(true);
    setTimeout(() => {
      const q = aiPrompt.toLowerCase();
      let stack = ['Next.js 14 App Router', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Vercel Edge'];
      if (q.includes('mobile') || q.includes('ios') || q.includes('android')) {
        stack = ['React Native', 'Expo SDK 51', 'Fastlane', 'Node.js Microservices', 'Supabase'];
      } else if (q.includes('game') || q.includes('3d') || q.includes('minecraft') || q.includes('mod')) {
        stack = ['Three.js', 'Unity WebGL', 'WebSockets', 'Go (Golang)', 'Docker'];
      } else if (q.includes('saas') || q.includes('crm') || q.includes('enterprise')) {
        stack = ['Next.js', 'Prisma ORM', 'Stripe Billing', 'Redis Cache', 'AWS ECS'];
      }

      setRecommendations({
        techStack: stack,
        phases: [
          {
            step: 'Phase 1: Architecture & Technical Scope',
            description: 'Define entity schemas, data flow pipelines, security policies, and user journeys.',
          },
          {
            step: 'Phase 2: High-Fidelity Interactive Prototype',
            description: 'Design key screens in Figma and validate micro-interactions with stakeholders.',
          },
          {
            step: 'Phase 3: Production Development & Testing',
            description: 'Build backend APIs and front-end interface with automated testing.',
          },
          {
            step: 'Phase 4: Launch, Audit & Post-Deployment Care',
            description: 'Conduct security and performance audits, followed by global CDN deployment.',
          },
        ],
      });
      setAiLoading(false);
    }, 1200);
  };

  return (
    <div className="pt-32 pb-24 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Column */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black font-headline tracking-tighter mb-8 leading-[0.92]"
            >
              Let&apos;s Build <br /> Your Next <br /> Digital Product
            </motion.h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Ready to take your project to the next level? Fill out the form or use our AI Project
              Advisor for immediate technical recommendations.
            </p>

            {/* AI Advisor Box */}
            <div className="space-y-8">
              <div className="p-8 bg-secondary text-white rounded-[2rem] border border-white/10 relative overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <h3 className="text-2xl font-black font-headline mb-4 flex items-center gap-2 relative z-10">
                  <BrainCircuit className="text-primary w-6 h-6" /> AI Project Advisor
                </h3>
                <p className="text-white/60 mb-6 relative z-10 text-sm leading-relaxed">
                  Input your project idea below to get instant AI-powered tech stack and roadmap
                  recommendations.
                </p>

                <form onSubmit={handleAiAdvisor} className="space-y-4 relative z-10">
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="E.g. I want to build a real-time SaaS platform for real estate agents..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 min-h-[120px] focus:outline-none focus:border-primary transition-colors text-white text-sm resize-none"
                  />
                  <button
                    type="submit"
                    disabled={aiLoading || !aiPrompt.trim()}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-primary/25 text-sm"
                  >
                    {aiLoading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <>
                        <Sparkles size={18} /> Get AI Recommendations
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form or AI Recommendations */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {recommendations ? (
                /* AI Results View */
                <motion.div
                  key="recommendations"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white border border-border p-8 md:p-10 rounded-[2rem] shadow-2xl h-full"
                >
                  <button
                    onClick={() => setRecommendations(null)}
                    className="text-primary font-bold mb-6 hover:underline flex items-center gap-1.5 cursor-pointer text-sm"
                  >
                    <ArrowLeft size={16} /> Back to Contact Form
                  </button>

                  <h3 className="text-3xl font-black font-headline mb-6">
                    Your Technical Roadmap
                  </h3>

                  <div className="mb-8">
                    <h4 className="font-headline font-bold uppercase tracking-widest text-xs text-primary mb-3">
                      Recommended Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendations.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3.5 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-headline font-bold uppercase tracking-widest text-xs text-primary mb-4">
                      Development Phases
                    </h4>
                    <div className="space-y-4">
                      {recommendations.phases.map((p, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                          <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold shrink-0">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="font-bold text-sm md:text-base">{p.step}</p>
                            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                              {p.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-4 italic">
                      Happy with these suggestions? Let&apos;s discuss how Prospira can implement them for you.
                    </p>
                    <MagneticButton
                      onClick={() => {
                        setMessage(
                          `[AI Roadmap Request]\nIdea: ${aiPrompt}\nStack: ${recommendations.techStack.join(', ')}`
                        );
                        setRecommendations(null);
                      }}
                      className="w-full justify-center"
                    >
                      Schedule a Deep Dive <Send size={18} />
                    </MagneticButton>
                  </div>
                </motion.div>
              ) : isSubmitted ? (
                /* Success View */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary text-white p-12 rounded-[2rem] text-center flex flex-col items-center justify-center shadow-2xl h-full min-h-[450px]"
                >
                  <CheckCircle2 size={80} className="mb-6" />
                  <h3 className="text-4xl font-black font-headline mb-4">Message Received!</h3>
                  <p className="text-white/80 max-w-sm mx-auto leading-relaxed mb-8">
                    Thanks for reaching out. A Prospira technical lead will review your requirements
                    and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setEmail('');
                      setCompany('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 bg-white text-secondary font-bold rounded-full hover:bg-accent transition-all shadow-md text-sm cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                /* Contact Form View */
                <motion.form
                  key="form"
                  onSubmit={handleFormSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[#FDF6E3] border border-border p-8 md:p-10 rounded-[2rem] shadow-xl space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest opacity-60 block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                        }}
                        className="w-full bg-white border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                        placeholder="John Doe"
                      />
                      {formErrors.name && (
                        <p className="text-xs text-red-500">{formErrors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest opacity-60 block">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                        }}
                        className="w-full bg-white border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                        placeholder="john@company.com"
                      />
                      {formErrors.email && (
                        <p className="text-xs text-red-500">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-60 block">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-white border border-border rounded-xl p-4 text-sm focus:outline-none focus:border-primary transition-colors text-foreground"
                      placeholder="Acme Inc."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-60 block">
                      Tell us about your project *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                      }}
                      className="w-full bg-white border border-border rounded-xl p-4 min-h-[150px] text-sm focus:outline-none focus:border-primary transition-colors text-foreground resize-none"
                      placeholder="Briefly describe your goals, timeline, and any specific needs..."
                    />
                    {formErrors.message && (
                      <p className="text-xs text-red-500">{formErrors.message}</p>
                    )}
                  </div>

                  <MagneticButton
                    type="submit"
                    disabled={submitting}
                    className="w-full justify-center"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} /> Sending...
                      </>
                    ) : (
                      <>
                        Send Inquiry <Send size={18} />
                      </>
                    )}
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
