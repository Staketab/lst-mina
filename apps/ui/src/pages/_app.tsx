import '../styles/globals.css';
import '../../public/normalize.css';
import '../../public/variables.css';
import '../../public/theme.css';
import '../../public/fonts.css';
import '../../public/typography.css';

import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { WalletContext } from '../hooks/useAuroWallet';
import useAuroWalletCore from '../hooks/useAuroWalletCore';

export default function App({ Component, pageProps }: AppProps) {
    const walletData = useAuroWalletCore();

    const handleWindowResize = () => {
        document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <WalletContext.Provider value={walletData}>
            <Component {...pageProps} />
        </WalletContext.Provider>
    );
}
