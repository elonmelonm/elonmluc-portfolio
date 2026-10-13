import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import Terminal from './Terminal';
import { usePageView } from '../hooks/usePageView';
import Seo from './Seo';

const Layout = () => {
    const location = useLocation();
    usePageView();

    return (
        <div className="site min-h-screen px-4 sm:px-6 lg:px-14 transition-colors duration-300">
            <Seo />
            <div className="mx-auto max-w-[1200px]">
                <Header />
                <main>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
                <Footer />
            </div>
            <WhatsAppButton />
            <Terminal />
        </div>
    );
};

export default Layout;
