import { FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Bouton flottant présent sur toutes les pages publiques.
export default function WhatsAppButton() {
    const { t } = useTranslation();

    return (
        <a
            href="https://wa.me/22957113810"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('ui.whatsapp')}
            className="group fixed right-4 sm:right-8 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] sm:bottom-8 z-50 inline-flex items-center rounded-full bg-whatsapp p-3.5 text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
            <FaWhatsapp size={24} aria-hidden="true" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap font-medium transition-[max-width,margin] duration-300 group-hover:ml-2.5 group-hover:mr-1.5 group-hover:max-w-[100px] group-focus-visible:ml-2.5 group-focus-visible:mr-1.5 group-focus-visible:max-w-[100px]">
                WhatsApp
            </span>
        </a>
    );
}
