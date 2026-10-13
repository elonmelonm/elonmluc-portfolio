import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useTranslation } from "react-i18next";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const channels = [
  { name: "WhatsApp", link: "https://wa.me/22957113810", descKey: "contact.social.whatsapp.desc", detail: "+229 01 57 11 38 10" },
  { name: "LinkedIn", link: "https://linkedin.com/in/luc-elonm-akakpo/", descKey: "contact.social.linkedin.desc" },
  { name: "GitHub", link: "https://github.com/elonmelonm", descKey: "contact.social.github.desc" },
  { name: "Email", link: "mailto:elonmlucakakpo@gmail.com", descKey: "contact.social.email.desc", detail: "elonmlucakakpo@gmail.com" },
];

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    emailjs
      .send(
        'service_6zdpjyp',
        'template_qzwrzsl',
        { from_name: formData.name, from_email: formData.email, message: formData.message },
        'ShfEbM7aGAa906G90'
      )
      .then(
        () => {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
        },
        () => setStatus('error')
      );
  };

  const fieldClass = "w-full rounded border border-rule bg-paper px-3.5 py-3 text-ink placeholder:text-muted/70 focus:border-indigo focus:outline-none focus:ring-[3px] focus:ring-indigo-soft";

  return (
    <section id="contact" className="py-[clamp(40px,7vw,96px)]">
      <div className="mb-[clamp(40px,6vw,80px)] grid items-end gap-[clamp(24px,5vw,72px)] md:grid-cols-[7fr_5fr]">
        <h1 className="page-title">{t('contact.title')}<span className="text-indigo">.</span></h1>
        <p className="lede">{t('contact.subtitle')}</p>
      </div>

      <div className="grid items-start gap-[clamp(28px,5vw,80px)] md:grid-cols-2">
        <div>
          <ul className="border-t border-rule">
            {channels.map((channel) => (
              <li key={channel.name}>
                <a
                  href={channel.link}
                  target={channel.link.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-b border-rule py-[18px] focus-ring"
                >
                  <span className="font-display text-[1.35rem] font-semibold transition-colors group-hover:text-indigo">{channel.name}</span>
                  <ArrowUpRight size={18} className="row-span-2 self-center text-indigo" aria-hidden="true" />
                  <span className="text-muted">
                    {t(channel.descKey)}{channel.detail && ` · ${channel.detail}`}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="label mt-5">{t('contact.info.location.label')} : {t('contact.info.location.val')}</p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 rounded-md border border-rule bg-surface p-[clamp(20px,3vw,32px)]">
          <label className="grid gap-1.5 text-[0.92rem] font-medium">
            {t('contact.form.name.label')}
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t('contact.form.name.placeholder')} autoComplete="name" required className={fieldClass} />
          </label>
          <label className="grid gap-1.5 text-[0.92rem] font-medium">
            {t('contact.form.email.label')}
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t('contact.form.email.placeholder')} autoComplete="email" required className={fieldClass} />
          </label>
          <label className="grid gap-1.5 text-[0.92rem] font-medium">
            {t('contact.form.message.label')}
            <textarea name="message" value={formData.message} onChange={handleChange} rows={6} placeholder={t('contact.form.message.placeholder')} required className={fieldClass} />
          </label>
          <button type="submit" disabled={status === 'loading'} className="btn-primary justify-self-start disabled:opacity-60">
            {status === 'loading' ? t('contact.form.status.sending') : t('contact.form.submit')} <ArrowRight size={16} />
          </button>
          <p aria-live="polite" className="text-sm">
            {status === 'success' && <span className="text-live">{t('contact.form.status.success')}</span>}
            {status === 'error' && <span className="text-red-600 dark:text-red-400">{t('contact.form.status.error')}</span>}
          </p>
        </form>
      </div>
    </section>
  );
};

export default Contact;
