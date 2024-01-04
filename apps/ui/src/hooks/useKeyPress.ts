import { useEffect } from 'react';

export const useKeyPress = (key, cb) => {
    const onKeyPress = (e) => {
        e.code === key && cb(e);
    };

    useEffect(() => {
        document.addEventListener('keydown', onKeyPress);
        return () => {
            document.removeEventListener('keydown', onKeyPress);
        };
    }, [cb]);
};
