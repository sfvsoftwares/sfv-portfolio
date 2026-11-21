'use client';

import { useEffect, useState } from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedText from '@/components/ui/AnimatedText';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send, Loader2, MapPin, ArrowUpRight, Check } from 'lucide-react';
import InstagramIcon from '@/components/ui/InstagramIcon';

interface ProjectTypeOption {
  id: string;
  label: string;
  desc: string;
}

interface ContactSectionProps {
  contact: {
    kicker?: string;
    title: string;
    subtitle: string;
    direct_cta?: string;
    direct_description?: string;
    whatsapp_button?: string;
    form: {
      project_type?: string;
      project_types?: ProjectTypeOption[];
      name: string;
      name_placeholder: string;
      email: string;
      email_placeholder: string;
      message: string;
      message_placeholder: string;
      submit: string;
      sending: string;
      success: string;
      success_detail?: string;
      send_another?: string;
      error: string;
      whatsapp_template?: {
        greeting: string;
        name_label: string;
        project_label: string;
        email_label: string;
        details_label: string;
      };
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

const DEFAULT_PROJECT_TYPES: ProjectTypeOption[] = [
  { id: 'landing_page', label: 'Landing Page Estratégica', desc: 'Foco em conversão e tráfego pago' },
  { id: 'portfolio', label: 'Portfólio Executivo', desc: 'Autoridade para profissionais e líderes' },
  { id: 'institutional', label: 'Site Institucional', desc: 'Presença corporativa completa' },
  { id: 'web_system', label: 'Sistema Web Sob Medida', desc: 'Painéis, portais e automações' },
];

export default function ContactSection({ contact }: ContactSectionProps) {
  const projectTypes = contact.form.project_types?.length
    ? contact.form.project_types
    : DEFAULT_PROJECT_TYPES;

  const [selectedProjectType, setSelectedProjectType] = useState<string>(
    projectTypes[0]?.id || 'landing_page'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleSelectProject = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const incomingId = customEvent.detail;
      if (incomingId && projectTypes.some((item) => item.id === incomingId)) {
        setSelectedProjectType(incomingId);
        setIsSuccess(false);
      }
    };

    window.addEventListener('sfv:select-project', handleSelectProject);
    return () => window.removeEventListener('sfv:select-project', handleSelectProject);
  }, [projectTypes]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    const selectedType =
      projectTypes.find((item) => item.id === selectedProjectType)?.label ||
      selectedProjectType;

    const template = contact.form.whatsapp_template || {
      greeting: 'Olá, SFV! Vim pelo site e gostaria de conversar sobre um projeto.',
      name_label: 'Nome',
      project_label: 'Tipo de projeto',
      email_label: 'E-mail',
      details_label: 'Sobre o projeto',
    };

    const structuredMessage = [
      template.greeting,
      '',
      `*${template.name_label}:* ${name}`,
      `*${template.project_label}:* ${selectedType}`,
      `*${template.email_label}:* ${email}`,
      `*${template.details_label}:* ${message}`,
    ].join('\n');

    const targetUrl = `https://wa.me/5571991329737?text=${encodeURIComponent(structuredMessage)}`;
    setWhatsappUrl(targetUrl);

    // Open synchronously inside the submit handler so mobile/desktop browsers don't block the popup
    window.open(targetUrl, '_blank', 'noopener,noreferrer');

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <SectionWrapper id="contact" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
                <div className="min-h-[420px] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-lg flex items-center justify-center mb-6 text-emerald-400">
                    <Send className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-white mb-2">
                    {contact.form.success}
                  </h3>
                  <p className="text-slate-400 text-sm max-w-md mb-6 leading-relaxed">
                    {contact.form.success_detail ||
                      'A conversa foi aberta no seu WhatsApp com o resumo do projeto para atendimento imediato.'}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    {whatsappUrl && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-mono font-medium uppercase tracking-wider text-white transition-colors"
                      >
                        <span>{contact.whatsapp_button || 'Conversar no WhatsApp'}</span>
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="px-5 py-2.5 rounded-lg border border-white/[0.1] text-xs font-mono uppercase tracking-wider text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      {contact.form.send_another || 'Enviar nova solicitação'}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Lead Qualification: Project Type Selector */}
                  <div>
                    <span
                      id="project-type-label"
                      className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-2.5"
                    >
                      {contact.form.project_type || 'Tipo de projeto'}
                    </span>
                    <div
                      role="radiogroup"
                      aria-labelledby="project-type-label"
                      className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
                    >
                      {projectTypes.map((option) => {
                        const isSelected = selectedProjectType === option.id;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setSelectedProjectType(option.id)}
                            className={`text-left rounded-lg border p-3.5 transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                              isSelected
                                ? 'border-purple-500 bg-purple-950/25 text-white'
                                : 'border-white/[0.08] bg-[#08090E] text-slate-300 hover:border-white/20 hover:bg-white/[0.02]'
                            }`}
                          >
                            <div className="min-w-0">
                              <span className="block text-sm font-medium leading-snug text-white">
                                {option.label}
                              </span>
                              <span className="block text-xs text-slate-400 mt-0.5 leading-snug">
                                {option.desc}
                              </span>
                            </div>
                            <span
                              className={`mt-0.5 w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 transition-colors ${
                                isSelected
                                  ? 'border-purple-400 bg-purple-600 text-white'
                                  : 'border-white/20 bg-transparent'
                              }`}
                              aria-hidden="true"
                            >
                              {isSelected && <Check size={11} strokeWidth={3} />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                {contact.direct_description ||
                  'Nosso canal direto no WhatsApp está aberto para tirar dúvidas, estimar prazos ou agendar uma reunião.'}
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
