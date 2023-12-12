import { useEffect, useState } from 'react';

export const useIsFullyScrolled = (ref, triggerOffset = 0) => {
    const [fullyScrolled, setFullyScrolled] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const isFullyScrolledCheck = ({ target }) => {
        if (!target) return setFullyScrolled(false);
        target.offsetWidth + target.scrollLeft >= target.scrollWidth - triggerOffset
            ? setFullyScrolled(true)
            : setFullyScrolled(false);
    };

    const setIsScrolledOrNot = (ref) => {
        if (!ref) return null;
        if (ref.current?.scrollWidth > ref.current?.clientWidth) {
            return setIsScrolled(true);
        }
        return setIsScrolled(false);
    };

    useEffect(() => {
        isFullyScrolledCheck({ target: ref.current });
        setIsScrolledOrNot(ref);
        ref.current?.addEventListener('scroll', isFullyScrolledCheck);
        ref.current?.addEventListener('load', isFullyScrolledCheck);
        return () => {
            ref.current?.removeEventListener('scroll', isFullyScrolledCheck);
            ref.current?.removeEventListener('load', isFullyScrolledCheck);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref.current, ref.current?.scrollWidth]);

    return { fullyScrolled, isScrolled };
};
