import React, { useRef } from 'react';
import WaitingInfoIcon from './waitingInfo.svg';

import classNames from 'classnames';
import TooltipWrapper from '../tooltipWrapper';
import styles from './index.module.css';
import InfoIconComponent from './infoIcon';
import Image from 'next/image';
type InfoTooltipProps = {
    tooltipText: string;
    className?: string;
    children: React.ReactNode;
    classNameWrapper?: string;
    offsetLeft?: string;
    waitingInfo?: boolean;
    isLoading?: boolean;
    noCloseOnClickInside?: boolean;
    blackTooltip?: boolean;
    closeTimeOut?: number;
};

const InfoTooltip = ({
    tooltipText,
    className,
    children,
    classNameWrapper,
    waitingInfo,
    isLoading,
    noCloseOnClickInside,
    blackTooltip,
    closeTimeOut,
}: InfoTooltipProps): JSX.Element => {
    const controlRef = useRef(null);

    return (
        <div className={classNames(styles.infoTooltip, classNameWrapper)}>
            <TooltipWrapper
                tooltipText={tooltipText}
                controlRef={controlRef}
                isLoading={isLoading}
                noCloseOnClickInside={noCloseOnClickInside}
                blackTooltip={blackTooltip}
                closeTimeOut={closeTimeOut}
            >
                <div className={classNames(styles.icon, className)} ref={controlRef}>
                    {waitingInfo ? <Image src={WaitingInfoIcon} alt="ƒ" /> : children ?? <InfoIconComponent />}
                </div>
            </TooltipWrapper>
        </div>
    );
};

export default InfoTooltip;
