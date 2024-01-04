import '../styles/globals.css';
import '../../public/normalize.css';
import '../../public/variables.css';
import '../../public/theme.css';
import '../../public/fonts.css';
import '../../public/typography.css';

import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import OverlayWrapper from '../components/molecules/popupOverlay/overlayWrapper';
import { Provider } from 'react-redux';
import { AppStore, createStore } from '../store';

export default function App({ Component, pageProps }: AppProps) {
    const [store, setStore] = useState<AppStore>(null);

    const handleWindowResize = () => {
        document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    if (!store) {
        setStore(createStore());
    }

    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <Provider store={store}>
            <OverlayWrapper />
            <Component {...pageProps} />
        </Provider>
    );
}
