import { useState, useEffect } from 'react';

const useAddressBalance = (address) => {
    const [balance, setBalance] = useState(null);

    const APIRequest = async (address) => {
        try {
            const balance = await fetch(`https://minascan.io/testworld/api//api/core/accounts/${address}/balance`);
            if ('balance' in balance) {
                setBalance(balance?.balance ?? 0);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        APIRequest(address);
    }, [address]);

    return {
        balance,
        balanceLoading: balance === null,
    };
};

export default useAddressBalance;
