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
          className="fixed lg:mr-[250px] xl:mr-[320px] right-8 md:bottom-8 bottom-16 md:right-8 p-3 bg-gray-700 text-white rounded-full shadow-lg dark:bg-gray-100 dark:text-black hover:bg-slate-300 hover:text-black dark:hover:text-white dark:hover:bg-gray-900  transition duration-300"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}
