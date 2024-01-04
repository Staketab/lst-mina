import { useEffect, useState } from 'react';

export const useLazyAPILoad = (limit, scrolled, callback, maxItems) => {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const handler = async (limit) => {
        try {
            await callback(page + 1, limit);
            setPage(page + 1);
        } catch (error) {
            console.warn(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (scrolled && !loading && page * limit <= maxItems) {
            setLoading(true);
            handler(limit);
        }
    }, [scrolled]);

    return {
        page,
        loading,
    };
};
