import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useLocalStorage = (
    key: string,
    initialValue?: string
): [string, Dispatch<SetStateAction<boolean | string>>] => {
    const localStorageItem = (typeof window !== 'undefined' && localStorage?.getItem(key)) || initialValue || '';
    const [value, setValue] = useState(() => {
        return localStorageItem;
    });

    useEffect(() => {
        localStorage.setItem(key, value);
    }, [value, key]);

    return [value, setValue];
};
