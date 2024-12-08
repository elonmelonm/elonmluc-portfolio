import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="lg:hidden lg:mx-16 lg:mr-64 lg:min-h-screen py-16 bg-gray-50 rounded-xl dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-2 text-gray-900 dark:text-white transition-colors duration-300">
          Get in touch
        </h2>
        <h6 className='text-sm mb-10 text-center text-gray-500'>Contact me</h6>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg transition-colors duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
                    Nom
                  </label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
                    Email
                  </label>
                  <input 
                    type="email"
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 mb-2 transition-colors duration-300">
                    Message
                  </label>
                  <textarea 
                    className="w-full px-4 py-2 border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
                    rows={4}
                    placeholder="Votre message"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300"
                >
                  Envoyer
                </button>
              </form>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg transition-colors duration-300"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="text-blue-600 dark:text-blue-400 mt-1 transition-colors duration-300" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                      Email
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      elonmlucakakpo@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="text-blue-600 dark:text-blue-400 mt-1 transition-colors duration-300" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                      Téléphone
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                      +229 01 57 11 38 10
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="text-blue-600 dark:text-blue-400 mt-1 transition-colors duration-300" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                      Localisation
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
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