import classNames from 'classnames';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Portal from '../portal';
import styles from './index.module.css';
import { useMedia, useWindowResize } from '../../../hooks';

export default function FloatingTooltip({
    text,
    show,
    controlRef,
    onCloseTooltip,
    onClickInside,
    onOpenTooltip,
    noCloseOnClickInside,
    blackTooltip,
}) {
    const { isGreaterThanQuery } = useMedia(768);
    const [markerLeftIdent, setMarkerLeftIdent] = useState(null);
    const [topIndent, setTopIndent] = useState(null);
    const [leftIdent, setLeftIdent] = useState(null);
    const contentRef = useRef(null);

    const markerHeight = isGreaterThanQuery ? 10 : 0;

    const getIndents = useCallback(() => {
        const contentWidth = contentRef?.current?.clientWidth || 0;
        const controlWidth = controlRef?.current?.clientWidth || 0;
        const controlLeftIndent = controlRef?.current?.getBoundingClientRect().left;
        const controlMiddle = controlWidth / 2 + controlLeftIndent;
        const bodyWidth = document.body.clientWidth;
        let contentLeftIndent = controlMiddle - contentWidth / 2;
        const scrollY = window.scrollY;
        const viewportTop = controlRef?.current?.getBoundingClientRect().bottom;
        if (bodyWidth < contentLeftIndent + contentWidth) contentLeftIndent = bodyWidth - contentWidth;
        if (contentLeftIndent <= 0) contentLeftIndent = 10;
        const markerLeftIndent = controlMiddle - contentLeftIndent - 10;
        const contentTopIndent = viewportTop + scrollY + markerHeight - 10 || 0;
        return { contentLeftIndent, markerLeftIndent, contentTopIndent };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controlRef]);

    const setIndents = useCallback(() => {
        if (!show) return;

        const { contentLeftIndent, markerLeftIndent, contentTopIndent } = getIndents();
        setMarkerLeftIdent(markerLeftIndent);
        setTopIndent(contentTopIndent);
        setLeftIdent(contentLeftIndent);
    }, [show, getIndents]);

    const handleWindowResize = useCallback(() => {
        setIndents();
    }, [setIndents]);

    useWindowResize(handleWindowResize);

    useEffect(() => {
        return setLeftIdent(null);
    }, [show]);

    useEffect(() => {
        if (show) {
            handleWindowResize();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);
    useEffect(() => {
        const body = document.body;
        body.addEventListener('touchstart', onCloseTooltip);
        return () => {
            body.removeEventListener('touchstart', onCloseTooltip);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const showTooltip = show && text !== null && text !== undefined;
    if (!controlRef?.current) return null;

    return showTooltip ? (
        <Portal onClick={!noCloseOnClickInside && (onClickInside ? onClickInside : onCloseTooltip)}>
            <div
                className={classNames(styles.tooltip, 'floatingTooltip', {
                    [styles.visibleTooltip]: !leftIdent,
                    [styles.blackTooltip]: blackTooltip,
                    [styles.whiteTooltip]: !blackTooltip,
                })}
                ref={contentRef}
                onMouseEnter={onOpenTooltip}
                onMouseLeave={onCloseTooltip}
            >
                <div
                    className={classNames(styles.content, {
                        [styles.blackContent]: blackTooltip,
                    })}
                >
                    {text}
                </div>
            </div>
            <style>{`
                .floatingTooltip {
                    top: ${topIndent}px;
                    left: ${leftIdent}px;
                }
                .floatingTooltip::before, .floatingTooltip::after {
                    left: ${markerLeftIdent}px;
                }
            `}</style>
        </Portal>
    ) : null;
}
