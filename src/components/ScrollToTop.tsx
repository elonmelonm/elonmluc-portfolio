import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Le site public remonte en haut pendant sa transition de page (Layout).
        if (!pathname.startsWith('/admin')) return;
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
