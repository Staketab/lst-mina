import auroIcon from './img/auro.png';

const getWalletConfig = () => [
    {
        // eslint-disable-next-line valid-typeof
        installed: typeof window !== 'undefined' && window['mina']?.isAuro,
        name: 'Auro Wallet',
        icon: auroIcon,
        downloadUrl: {
            browserExtension: 'https://chrome.google.com/webstore/detail/auro-wallet/cnmamaachppnkjgnildpdmkaakejnhae',
        },
    },
];

export default getWalletConfig;
