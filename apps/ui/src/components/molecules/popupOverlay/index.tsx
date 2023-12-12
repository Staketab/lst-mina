import classNames from 'classnames';
import React, { useEffect, useState, useRef } from 'react';
import reactDom from 'react-dom';
import style from './PopupOverlay.module.css';
import { useRouter } from 'next/router';
import { useMedia } from '../../../hooks';

type PopupOverlayProps = {
    children: React.ReactNode;
    onClose?: () => void;
    position?: string;
    show?: boolean;
    animation?: string;
    forwardedRef?: any;
    zIndex?: number;
    height?: string;
};

const animations = {
    appear: {
        in: style.appear,
        out: style.disappear,
    },
    slideUp: {
        in: style.slideUpIn,
        out: style.slideUpOut,
    },
    slideRight: {
        in: style.slideRightIn,
        out: style.slideRightOut,
    },
    slideLeft: {
        in: style.slideLeftIn,
        out: style.slideLeftOut,
    },
};

const PopupOverlay = ({
    children,
    onClose = () => {},
    position = 'bottom',
    show,
    animation = 'slideUp',
    forwardedRef,
    zIndex = 50,
    height = 'auto',
}: PopupOverlayProps): JSX.Element => {
    const location = useRouter();

    const overlayRef = useRef(null);

    const [showState, setShowState] = useState(false);
    const [active, setActive] = useState(false);
    const [timeoutID, setTimeoutID] = useState(null);
    const [isTextSelected, setIsTextSelected] = useState(false);
    const initBodyWidth = typeof document !== 'undefined' && document.body.offsetWidth;
    const media = useMedia();

    const checkSelection = () => {
        const selection = window.getSelection();
        if (selection && selection.toString().length > 0) {
            setIsTextSelected(true);
        } else {
            setIsTextSelected(false);
        }
    };

    const getAppWrapper = (): HTMLElement => {
        return document.querySelector('.app-wrapper');
    };
    const showPopup = (initBodyWidth) => {
        setActive(true);
        setShowState(true);

        const appWrapper = getAppWrapper();
        appWrapper && media.greater.sm && (appWrapper.style.position = 'fixed');
        document.getElementById('popup-overlay')?.classList.add(style.overlayWrapperActive);
        document.body.style.overflowY = 'hidden';

        const currentBodyWidth = document.body.offsetWidth;
        if (initBodyWidth !== currentBodyWidth) {
            document.body.style.paddingRight = `${currentBodyWidth - initBodyWidth}px`;
            appWrapper && (appWrapper.style.paddingRight = `${currentBodyWidth - initBodyWidth}px`);
        }
    };

    const closePopup = (unmount = false) => {
        const appWrapper = getAppWrapper();
        if (appWrapper) {
            appWrapper.style.position = 'relative';
            appWrapper.style.paddingRight = '0px';
        }
        appWrapper && media.greater.sm && (appWrapper.style.position = 'static');
        const completeClose = document.getElementById('popup-overlay')?.children.length < 2;
        !unmount && setActive(false);
        if (completeClose) document.getElementById('popup-overlay')?.classList.remove(style.overlayWrapperActive);
        const timeout = setTimeout(() => {
            !unmount && setShowState(false);
            !unmount && onClose();
            if (completeClose) {
                document.body.style.paddingRight = '0';
                document.body.style.overflowY = 'scroll';
            }
        }, 300);
        setTimeoutID(timeout);
    };

    const handleClose = () => {
        if (active && !isTextSelected) {
            closePopup();
        } else {
            setIsTextSelected(false);
        }
    };

    useEffect(() => {
        if (show) {
            handleClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutID);
        };
    }, [active, timeoutID]);

    useEffect(() => {
        if (show) showPopup(initBodyWidth);
        else if (!show && showState) closePopup();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show]);

    useEffect(() => {
        return () => {
            closePopup(true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return showState
        ? reactDom.createPortal(
              <>
                  <div
                      className={classNames(style.wrapper, {
                          [animations.appear.in]: active,
                          [animations.appear.out]: !active,
                      })}
                      ref={overlayRef}
                      onClick={handleClose}
                      onMouseUp={checkSelection}
                      style={{ zIndex }}
                  >
                      <div
                          className={classNames(style.popupOverlay, style[position], {
                              [animations[animation]?.in]: active,
                              [animations[animation]?.out]: !active,
                          })}
                          ref={forwardedRef ?? null}
                          style={{ height }}
                          onClick={(e) => e.stopPropagation()}
                      >
                          {children}
                      </div>
                  </div>
              </>,
              document.getElementById('popup-overlay')
          )
        : null;
};

export default PopupOverlay;
