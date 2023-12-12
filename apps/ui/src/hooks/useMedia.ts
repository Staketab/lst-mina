import { useEffect, useState, useCallback } from 'react';
import _, { debounce } from 'lodash';

export const useMedia = (query?: string | number) => {
    let innerWidth;
    if (typeof window !== 'undefined') {
        innerWidth = window.innerWidth;
    }
    const [width, setWidth] = useState(innerWidth);
    const [dimensions, setDimensions] = useState({
        xs: width <= 576,
        sm: width > 576 && width <= 768,
        md: width > 768 && width <= 992,
        lg: width > 992 && width <= 1200,
        xl: width > 1200 && width <= 1400,
        xxl: width > 1400,
    });
    const [greater, setGreater] = useState({
        xs: width > 576,
        sm: width > 768,
        md: width > 992,
        lg: width > 1200,
        xl: width > 1400,
    });
    const [isGreaterThanQuery, setIsGreaterThanQuery] = useState(true);

    const debouncedUpdateWidth = useCallback(
        debounce(() => setWidth(innerWidth), 200),
        []
    );

    useEffect(() => {
        window.addEventListener('resize', debouncedUpdateWidth);
        return () => {
            window.removeEventListener('resize', debouncedUpdateWidth);
        };
    }, [debouncedUpdateWidth]);

    useEffect(() => {
        setDimensions({
            xs: width <= 576,
            sm: width > 576 && width <= 768,
            md: width > 768 && width <= 992,
            lg: width > 992 && width <= 1200,
            xl: width > 1200 && width <= 1400,
            xxl: width > 1400,
        });
        setGreater({
            xs: width > 576,
            sm: width > 768,
            md: width > 992,
            lg: width > 1200,
            xl: width > 1400,
        });
    }, [width]);

    useEffect(() => {
        setIsGreaterThanQuery(width > Number(query));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width]);

    return {
        width,
        dimensions,
        isGreaterThanQuery,
        greater,
    };
};
