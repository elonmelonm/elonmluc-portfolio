import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  interface FormData {
    name: string;
    email: string;
    message: string;
  }

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message
    };

    emailjs
      .send(
        'service_6zdpjyp',
        'template_qzwrzsl',
        templateParams,
        'ShfEbM7aGAa906G90'
      )
      .then(
        (response: { status: number; text: string }) => {
          console.log('Email envoyé avec succès !', response.status, response.text);
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
        },
        (error: Error) => {
          console.error('Erreur lors de l\'envoi de l\'email :', error);
          setStatus('error');
        }
      );
  };

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={32} />,
      link: "https://wa.me/22957113810",
      color: "bg-[#25D366]",
      descKey: "contact.social.whatsapp.desc"
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={32} />,
      link: "https://linkedin.com/in/luc-elonm-akakpo/",
      color: "bg-[#0077B5]",
      descKey: "contact.social.linkedin.desc"
    },
    {
      name: "GitHub",
      icon: <Github size={32} />,
      link: "https://github.com/elonmelonm",
      color: "bg-[#333]",
      descKey: "contact.social.github.desc"
    },
    {
      name: "Email",
      icon: <Mail size={32} />,
      link: "mailto:elonmlucakakpo@gmail.com",
      color: "bg-[#EA4335]",
      descKey: "contact.social.email.desc"
    }
  ];

  return (
    <section
      id="contact"
      className="lg:mx-16 lg:min-h-screen py-16 rounded-xl dark:bg-transparent transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-2 text-primary transition-colors duration-300"
        >
          {t('contact.title')}
        </motion.h2>
        <h6 className="text-sm mb-10 text-center text-gray-500">{t('contact.subtitle')}</h6>

        {/* Social Connect Cards Section */}
        <div className="mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative p-8 rounded-3xl bg-secondary/5 dark:bg-white/5 border border-secondary/10 dark:border-white/10 overflow-hidden flex flex-col items-center text-center transition-all"
              >
                {/* Background Hover Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${social.color}`} />

                <div className={`mb-6 p-4 rounded-2xl text-white shadow-lg ${social.color} group-hover:scale-110 transition-transform duration-300`}>
                  {social.icon}
                </div>

                <h4 className="text-xl font-bold dark:text-white mb-2">{social.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t(social.descKey)}</p>

                <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center group-hover:translate-x-2 transition-transform">
                  {t('contact.social.cta')} <Send size={12} className="ml-2" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-light-bg/50 dark:bg-dark-bg/50 p-6 rounded-xl border border-secondary/10 backdrop-blur-sm transition-colors duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-secondary dark:text-gray-200 mb-2 transition-colors duration-300">
                    {t('contact.form.name.label')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-light-bg dark:bg-dark-bg text-secondary dark:text-white transition-colors duration-300"
                    placeholder={t('contact.form.name.placeholder')}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
                    {t('contact.form.email.label')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
                    placeholder={t('contact.form.email.placeholder')}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
                    {t('contact.form.message.label')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
                    rows={4}
                    placeholder={t('contact.form.message.placeholder')}
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-primary text-white py-2 px-4 rounded-full hover:bg-primary/90 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('contact.form.submit')}
                </motion.button>
              </form>

              {/* Affichage des messages de statut */}
              {status === 'loading' && (
                <p className="text-yellow-500 mt-4">{t('contact.form.status.sending')}</p>
              )}
              {status === 'success' && (
                <p className="text-green-500 mt-4">{t('contact.form.status.success')}</p>
              )}
              {status === 'error' && (
                <p className="text-red-500 mt-4">{t('contact.form.status.error')}</p>
              )}
            </motion.div>

            <motion.div
              className="bg-light-bg/50 dark:bg-dark-bg/50 p-6 rounded-xl border border-secondary/10 backdrop-blur-sm transition-colors duration-300"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="text-primary mt-1 transition-colors duration-300" />
                  <div>
                    <h4 className="font-semibold text-primary transition-colors duration-300">
                      {t('contact.info.email.label')}
                    </h4>
                    <p className="text-gray-900 dark:text-white transition-colors duration-300">
                      elonmlucakakpo@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="text-primary mt-1 transition-colors duration-300" />
                  <div>
                    <h4 className="font-semibold text-primary transition-colors duration-300">
                      {t('contact.info.phone.label')}
                    </h4>
                    <p className="text-gray-900 dark:text-white transition-colors duration-300">
                      +229 01 57 11 38 10
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="text-primary mt-1 transition-colors duration-300" />
                  <div>
                    <h4 className="font-semibold text-primary transition-colors duration-300">
                      {t('contact.info.location.label')}
                    </h4>
                    <p className="text-gray-900 dark:text-white transition-colors duration-300">
                      {t('contact.info.location.val')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
