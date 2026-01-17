import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Helper component that resets the scroll position to the top
 * whenever the route (URL path) changes.
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
