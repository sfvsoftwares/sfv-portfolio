'use client';

import { useState } from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedText from '@/components/ui/AnimatedText';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send, Loader2, MapPin, ArrowUpRight } from 'lucide-react';
import InstagramIcon from '@/components/ui/InstagramIcon';

interface ContactSectionProps {
  contact: {
    kicker?: string;
    title: string;
    subtitle: string;
    direct_cta?: string;
    whatsapp_button?: string;
    form: {
      name: string;
      name_placeholder: string;
      email: string;
      email_placeholder: string;
      message: string;
      message_placeholder: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
    info: {
      email_label: string;
      phone_label: string;
      social_label: string;
      location_label?: string;
      location_value?: string;
    };
  };
}

export default function ContactSection({ contact }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    const text = `Olá, SFV! Me chamo ${name}. Gostaria de conversar sobre um projeto: "${message}". (Meu e-mail para contato é ${email})`;
    const encodedText = encodeURIComponent(text);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.open(`https://wa.me/5571991329737?text=${encodedText}`, '_blank');
    }, 600);
  };

  return (
    <SectionWrapper id="contact" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with single title (bug fixed) */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-semibold tracking-wider text-purple-400 uppercase mb-3"
          >
            {contact.kicker || '// VAMOS CONVERSAR'}
          </motion.div>

          <AnimatedText
            text={contact.title}
            variant="heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-slate-400 font-body"
          >
            {contact.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Form Side (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <GlassCard className="p-8 sm:p-10">
              {isSuccess ? (
                <div className="min-h-[380px] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center mb-6 text-emerald-400">
                    <Send className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white mb-2">
                    {contact.form.success}
                  </h3>
                  <p className="text-slate-400 text-sm max-w-sm mb-6">
                    A conversa também foi iniciada no seu WhatsApp para agilizar o contato.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 rounded-full border border-white/[0.1] text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2"
                    >
                      {contact.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full bg-[#08090E] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm transition-colors"
                      placeholder={contact.form.name_placeholder}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2"
                    >
                      {contact.form.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full bg-[#08090E] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm transition-colors"
                      placeholder={contact.form.email_placeholder}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2"
                    >
                      {contact.form.message}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full bg-[#08090E] border border-white/[0.08] rounded-lg px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-sm transition-colors resize-none"
                      placeholder={contact.form.message_placeholder}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs font-mono uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {contact.form.sending}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        {contact.form.submit}
                      </span>
                    )}
                  </button>
                </form>
              )}
            </GlassCard>
          </motion.div>

          {/* Info Side (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between gap-6"
          >
            {/* Quick WhatsApp Action Box */}
            <div className="rounded-xl border border-white/[0.08] bg-[#0E1018] p-6">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider mb-2 font-semibold">
                <MessageCircle size={15} />
                <span>{contact.direct_cta || 'Prefere falar agora mesmo?'}</span>
              </div>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Nosso canal direto no WhatsApp está aberto para tirar dúvidas, estimar prazos ou agendar uma reunião.
              </p>
              <a
                href="https://wa.me/5571991329737?text=Ol%C3%A1%2C%20SFV!%20Gostaria%20de%20conversar%20sobre%20um%20projeto."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white text-xs font-mono uppercase tracking-wider transition-colors"
              >
                <span>{contact.whatsapp_button || 'Conversar no WhatsApp'}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Direct Channels Cards */}
            <div className="space-y-3">
              <a
                href="mailto:sfv.softwares@gmail.com"
                className="block group"
              >
                <div className="rounded-xl border border-white/[0.06] bg-[#0E1018]/60 p-4 flex items-center gap-4 group-hover:border-purple-500/30 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      {contact.info.email_label}
                    </span>
                    <span className="text-sm font-medium text-white group-hover:text-purple-200 transition-colors">
                      sfv.softwares@gmail.com
                    </span>
                  </div>
                </div>
              </a>

              <a
                href="https://wa.me/5571991329737"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="rounded-xl border border-white/[0.06] bg-[#0E1018]/60 p-4 flex items-center gap-4 group-hover:border-purple-500/30 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform flex-shrink-0">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      {contact.info.phone_label}
                    </span>
                    <span className="text-sm font-medium text-white group-hover:text-purple-200 transition-colors">
                      (71) 99132-9737
                    </span>
                  </div>
                </div>
              </a>

              <a
                href="https://instagram.com/sfv.softwares"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="rounded-xl border border-white/[0.06] bg-[#0E1018]/60 p-4 flex items-center gap-4 group-hover:border-purple-500/30 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform flex-shrink-0">
                    <InstagramIcon size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      {contact.info.social_label}
                    </span>
                    <span className="text-sm font-medium text-white group-hover:text-purple-200 transition-colors">
                      @sfv.softwares
                    </span>
                  </div>
                </div>
              </a>

              {/* Location Badge */}
              <div className="rounded-xl border border-white/[0.04] bg-[#0E1018]/40 p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-slate-400 flex-shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                    {contact.info.location_label || 'Localização'}
                  </span>
                  <span className="text-xs font-mono text-slate-300">
                    {contact.info.location_value || 'Salvador, Bahia — Brasil'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
