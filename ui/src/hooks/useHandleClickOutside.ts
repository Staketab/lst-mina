import { useCallback, useEffect } from 'react';

export const useHandleClickOutside = (ref, callback) => {
    const handleClickOutside = useCallback(
        (e) => {
            if (Array.isArray(ref)) {
                const trigger = ref.filter((el) => e.composedPath().includes(el)).length < 1;
                if (trigger) callback();
            } else {
                const current = ref;
                if (!current) return;
                if (!e.composedPath().includes(current)) {
                    callback();
                }
            }
        },
        [ref, callback]
    );

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, false);
        return () => document.removeEventListener('click', handleClickOutside, false);
    }, [ref]);
};
