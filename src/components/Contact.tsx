import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { GiMailShirt } from 'react-icons/gi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading'); // Ajoute un statut 'loading'

    emailjs
      .send(
        'service_6zdpjyp', // Remplacez par votre Service ID EmailJS
        'template_qzwrzsl', // Remplacez par votre Template ID EmailJS
        formData,
        'ShfEbM7aGAa906G90' // Remplacez par votre clé publique (User Token)
      )
      .then(
        (response) => {
          console.log('Email envoyé avec succès !', response.status, response.text);
          setStatus('success');
          setFormData({ name: '', email: '', message: '' }); // Réinitialise le formulaire
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de l\'email :', error);
          setStatus('error');
        }
      );
  };

  return (
    <section
      id="contact"
      className="lg:hidden lg:mx-16 lg:mr-64 lg:min-h-screen py-16 bg-gray-50 rounded-xl dark:bg-transparent transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <h2
          style={{ fontFamily: 'Rammetto One' }}
          className="text-4xl font-bold text-center mb-2 text-rose-700 dark:text-rose-500 transition-colors duration-300"
        >
          Get in touch
        </h2>
        <h6 className="text-sm mb-10 text-center text-gray-500">Contact me</h6>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white dark:bg-transparent p-6 rounded-xl shadow-lg transition-colors duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
                    rows={4}
                    placeholder="Votre message"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-rose-700 dark:bg-rose-500 text-white py-2 px-4 rounded-full hover:bg-rose-700 dark:hover:bg-rose-600 transition-colors duration-300"
                >
                  Envoyer
                </button>
              </form>

              {/* Affichage des messages de statut */}
              {status === 'loading' && (
                <p className="text-yellow-500 mt-4">Envoi en cours...</p>
              )}
              {status === 'success' && (
                <p className="text-green-500 mt-4">Message envoyé avec succès !</p>
              )}
              {status === 'error' && (
                <p className="text-red-500 mt-4">Erreur lors de l'envoi du message. Veuillez réessayer.</p>
              )}
            </motion.div>

            <motion.div
              className="bg-white dark:bg-transparent p-6 rounded-xl shadow-lg transition-colors duration-300"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="text-rose-700 dark:text-rose-500 mt-1 transition-colors duration-300" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-rose-50 transition-colors duration-300">
                      Email
                    </h4>
                    <p className="text-rose-700 dark:text-rose-500 transition-colors duration-300">
                      elonmlucakakpo@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="text-rose-700 dark:text-rose-500 mt-1 transition-colors duration-300" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-rose-50 transition-colors duration-300">
                      Téléphone
                    </h4>
                    <p className="text-rose-700 dark:text-rose-500 transition-colors duration-300">
                      +229 01 57 11 38 10
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="text-rose-600 dark:text-rose-500 mt-1 transition-colors duration-300" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-rose-50 transition-colors duration-300">
                      Localisation
                    </h4>
                    <p className="text-rose-600 dark:text-rose-500 transition-colors duration-300">
                      Bénin, Cotonou
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
