import React, { useRef, useEffect, ReactNode } from 'react';
import TooltipWrapper from '../tooltipWrapper';
import styles from './index.module.css';

type TruncateTextProps = {
    children: ReactNode;
    handleNameWidth?: (value: number) => void;
    isTruncateText?: boolean;
};

export default function TruncateText(props: TruncateTextProps): JSX.Element {
    const { children, handleNameWidth, isTruncateText } = props;
    const textRef = useRef(null);

    const getStatusTruncateText = () => {
        if (textRef.current?.scrollWidth > textRef.current?.clientWidth) {
            return true;
        }
        return false;
    };

    const tooltipText = getStatusTruncateText() ? children : null;

    const width = isTruncateText ? `fit-content` : '100%';

    useEffect(() => {
        if (textRef.current?.clientWidth && handleNameWidth) {
            handleNameWidth(textRef.current.clientWidth);
        }
    }, [textRef.current?.clientWidth, handleNameWidth]);

    return (
        <TooltipWrapper tooltipText={tooltipText} controlRef={textRef}>
            <div style={{ maxWidth: width, marginBottom: 0 }} ref={textRef} className={styles.truncatedWrapper}>
                {children}
            </div>
        </TooltipWrapper>
    );
}
