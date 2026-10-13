import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import Terminal from './Terminal';
import { usePageView } from '../hooks/usePageView';
import { dissolve, decodeHeading } from '../lib/pageTransition';
import Seo from './Seo';

const Layout = () => {
    const location = useLocation();
    const outlet = useOutlet();
    usePageView();

    // La page affichée ne change qu'une fois l'écran couvert par la dissolution.
    const outletRef = useRef(outlet);
    outletRef.current = outlet;
    const [shown, setShown] = useState(outlet);
    const shownPath = useRef(location.pathname);
    const running = useRef(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mainRef = useRef<HTMLElement>(null);

    // Chargement / rechargement : l'écran part couvert puis se dissout sur la page.
    const revealed = useRef(false);
    useLayoutEffect(() => {
        // Une seule fois, même si React rejoue l'effet en développement (StrictMode).
        if (!canvasRef.current || revealed.current) return;
        revealed.current = true;
        running.current = true;
        dissolve(canvasRef.current, () => {}, true).then(() => {
            running.current = false;
            decodeHeading(mainRef.current?.querySelector('h1') ?? null);
        });
    }, []);

    useEffect(() => {
        if (location.pathname === shownPath.current) return;
        shownPath.current = location.pathname;

        const swap = () => {
            setShown(outletRef.current);
            window.scrollTo(0, 0);
        };

        // Navigation pendant une transition : on remplace directement la page.
        if (running.current || !canvasRef.current) {
            swap();
            return;
        }

        running.current = true;
        dissolve(canvasRef.current, swap).then(() => {
            running.current = false;
            decodeHeading(mainRef.current?.querySelector('h1') ?? null);
        });
    }, [location.pathname]);

    return (
        <div className="site min-h-screen px-4 sm:px-6 lg:px-14 transition-colors duration-300">
            <Seo />
            <div className="mx-auto max-w-[1200px]">
                <Header />
                <main ref={mainRef}>{shown}</main>
                <Footer />
            </div>
            <WhatsAppButton />
            <Terminal />
            <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80] h-screen w-screen" />
        </div>
    );
};

export default Layout;
