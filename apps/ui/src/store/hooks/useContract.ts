import { RootState } from '..';
import { useDispatch, useSelector } from 'react-redux';
import * as ContractStore from '../contract/contractSlice';
import { Mina, PrivateKey } from 'o1js';
import configJson from '../../../../../packages/contracts/config.json';
import { useEffect } from 'react';
export const config = configJson.deployAliases['token'];

export const useContract = () => {
    const dispatch = useDispatch();

    const contract = useSelector<RootState, ContractStore.IContractData>((state) => state.contract);
    const setZkApp = (payload: any) => dispatch(ContractStore.setZkApp(payload));

    const init = async () => {
        const { BasicContract } = await import('../../../../../packages/contracts/build/src');
        // TODO add store for saving privateKey
        // let zkAppKey = PrivateKey.fromBase58(privateKey.toString());

        const zkAppKey = PrivateKey.random();

        const Network = Mina.Network(config.url);

        Mina.setActiveInstance(Network);
        const zkAppAddress = zkAppKey.toPublicKey();
        // @ts-ignore
        const zkApp = new BasicContract(zkAppAddress);

        const { verificationKey } = await BasicContract.compile();
        console.log(verificationKey);

        setZkApp(zkApp);
    };
    useEffect(() => {
        init();
    }, []);

    return {
        contract,
    };
};
