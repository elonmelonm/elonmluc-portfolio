import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ScrollUp() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 650);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  // Placé au-dessus du bouton WhatsApp flottant.
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      type="button"
      aria-label={t('ui.scroll_top')}
      className="fixed right-5 sm:right-9 bottom-[5.5rem] sm:bottom-28 z-50 grid size-11 place-items-center rounded-full border border-rule bg-surface text-ink shadow-[0_8px_20px_-8px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-0.5 focus-ring"
    >
      <ArrowUp size={18} />
    </button>
  );
}
