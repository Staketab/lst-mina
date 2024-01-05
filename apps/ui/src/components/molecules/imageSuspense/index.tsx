import React, { useState, useEffect, CSSProperties } from 'react';
import styles from './index.module.css';
import loader from './Eclipse-1s-200px.gif';
import Image from 'next/image';

type SrcType = {
    src?: string;
};

type ImgSuspenseProps = {
    fallback?: boolean;
    src?: SrcType;
    alt?: string;
    style?: CSSProperties;
    loaderStyle?: CSSProperties;
    onLoad?: () => void;
    onError?: () => void;
    isLoading?: boolean;
};

const ImgSuspense = ({
    fallback,
    src,
    alt,
    style,
    loaderStyle,
    onLoad,
    onError,
    isLoading = false,
    ...restProps
}: ImgSuspenseProps): JSX.Element => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    const [srcCurrent, setSrcCurrent] = useState<SrcType>(src);

    useEffect(() => {
        setSrcCurrent(src);
    }, [src]);

    if (isError) throw new Error('img onerror');
    return (
        <>
            <img
                src={srcCurrent?.src ?? (srcCurrent as string)}
                alt={alt}
                style={isLoaded ? style : { display: 'none' }}
                onLoad={() => {
                    typeof onLoad === 'function' && onLoad();
                    setIsLoaded(true);
                }}
                onError={() => {
                    typeof onError === 'function' ? onError() : setIsError(true);
                }}
                {...restProps}
            />
            {((!isLoaded && fallback) || !isLoaded || isLoading) && (
                <div className={styles.loader} style={loaderStyle ?? { width: '42px', height: '42px' }}>
                    <Image src={loader} alt="preloader" width={32} height={32} />
                </div>
            )}
        </>
    );
};

export default ImgSuspense;
