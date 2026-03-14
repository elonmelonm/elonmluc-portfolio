import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollUp() {
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
          className="fixed right-8 bottom-8 p-4 bg-primary text-white rounded-2xl shadow-2xl hover:scale-110 active:scale-90 transition-all duration-300 z-[60] group"
        >
          <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </div>
  );
}
