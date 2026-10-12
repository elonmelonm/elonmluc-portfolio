import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ScrollUp() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  // Détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 650); // Affiche le bouton après 300px de défilement
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Retour en haut de la page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          type="button"
          aria-label={t('ui.scroll_top')}
          className="fixed right-8 bottom-8 p-4 bg-primary text-white rounded-2xl shadow-2xl hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg transition-all duration-300 z-[60] group"
        >
          <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </div>
  );
}
