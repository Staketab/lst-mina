import { useEffect, useState } from 'react';

type Greater = {
    xs: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
};

export const useMedia = (): {
    width: number;
    greater: Greater;
} => {
    let innerWidth;
    if (typeof window !== 'undefined') {
        innerWidth = window.innerWidth;
    }
    const [width, setWidth] = useState<number>(innerWidth);

    const [greater, setGreater] = useState<Greater>({
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
    };
};
