import { useEffect, useState } from 'react';
import { useWindowResize } from './useWindowResize';

export const useSpaceToRight = (ref, width) => {
    const [hasSpaceToRight, setHasSpaceToRight] = useState(true);

    const calculateSpaceToRight = (obj) => {
        if (!obj) return;
        return window.innerWidth - obj.getBoundingClientRect().left;
    };

    useEffect(() => {
        setHasSpaceToRight(calculateSpaceToRight(ref) > width);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);

    useWindowResize(() => setHasSpaceToRight(calculateSpaceToRight(ref) > width));

    return hasSpaceToRight;
};
