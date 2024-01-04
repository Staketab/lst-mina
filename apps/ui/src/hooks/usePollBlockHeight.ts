import { useEffect, useState } from 'react';
import { useLoadBlockMutation } from '../store/chain/chainService';
import { POLLING_INTERVAL } from '../comman/constants';

export const usePollBlockHeight = () => {
    const [tick, setTick] = useState(0);
    const [loadBlock] = useLoadBlockMutation();

    useEffect(() => {
        loadBlock('');
    }, [tick]);

    useEffect(() => {
        const intervalId = setInterval(() => setTick((tick) => tick + 1), POLLING_INTERVAL);

        setTick((tick) => tick + 1);

        return () => clearInterval(intervalId);
    }, []);
};
