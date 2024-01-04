import { useEffect, useState } from 'react';

export const useMedia = (query?: string | number) => {
    let innerWidth;
    if (typeof window !== 'undefined') {
        innerWidth = window.innerWidth;
    }
    const [width, setWidth] = useState(innerWidth);
    const [isGreaterThanQuery, setIsGreaterThanQuery] = useState(true);
    const [greater, setGreater] = useState({
        xs: width > 576,
        sm: width > 768,
        md: width > 992,
        lg: width > 1200,
        xl: width > 1400,
    });

    useEffect(() => {
        window.addEventListener('resize', () => setWidth(innerWidth));
        return () => {
            window.removeEventListener('resize', () => setWidth(innerWidth));
        };
    }, []);

    useEffect(() => {
        setIsGreaterThanQuery(width > Number(query));

        setGreater({
            xs: width > 576,
            sm: width > 768,
            md: width > 992,
            lg: width > 1200,
            xl: width > 1400,
        });
    }, [width]);

    return {
        width,
        greater,
        isGreaterThanQuery,
    };
};
