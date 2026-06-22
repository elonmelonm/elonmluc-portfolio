import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useCertifications } from "../hooks/useCertifications";
import { getLang } from "../lib/lang";

export default function CertificationsPart() {
    const { i18n } = useTranslation();
    const { certifications, loading, error } = useCertifications();
    const lang = getLang(i18n.language);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[0, 1, 2].map((i) => (
                    <div key={i} className="h-32 rounded-3xl bg-primary/5 dark:bg-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-gray-500 dark:text-gray-400">{error}</p>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
            {certifications.map((cert) => (
                <div
                    key={cert.id}
                    className="p-8 bg-white dark:bg-white/5 rounded-3xl border border-secondary/10 dark:border-white/10 group hover:border-rose-600/30 transition-colors"
                >
                    <div className="text-xs font-bold text-primary mb-2">{cert.year}</div>
                    <h4 className="text-lg font-bold text-secondary dark:text-white mb-2">
                        {lang === 'fr' ? cert.title_fr : cert.title_en}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{cert.issuer}</p>
                </div>
            ))}
        </motion.div>
    );
}
