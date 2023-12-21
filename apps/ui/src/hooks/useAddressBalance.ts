import { useState, useEffect } from 'react';
import { ApiClient } from '../api/apiClient';
import { NETWORK } from '../comman/constants';

const BallanceApi = new ApiClient(`https://minascan.io/${NETWORK}/api//api/core/accounts/`);

const useAddressBalance = (address) => {
    const [balance, setBalance] = useState(null);

    const APIRequest = async (address) => {
        try {
            const balance = await BallanceApi.fetchData(`${address}/balance`);

            if ('balance' in balance) {
                setBalance(balance?.balance ?? 0);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (address) {
            APIRequest(address);
        }
    }, [address]);

    return {
        balance,
        balanceLoading: balance === null,
    };
};

export default useAddressBalance;
