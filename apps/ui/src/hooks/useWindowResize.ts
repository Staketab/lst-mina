import { useEffect } from 'react';
import _, { debounce } from 'lodash';

export const useWindowResize = (callback, debounceTimer = 250): void => {
    useEffect(() => {
        const debouncedCallback = debounce(callback, debounceTimer);
        window.addEventListener('load', debouncedCallback);
        window.addEventListener('resize', debouncedCallback);
        return () => {
            window.removeEventListener('load', debouncedCallback);
            window.removeEventListener('resize', debouncedCallback);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callback]);
};
