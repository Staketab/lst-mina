import React, { Ref, useEffect, useState } from 'react';
import FloatingTooltip from '../floatingTooltip';
type TooltipWrapperProps = {
    children: React.ReactNode;
    tooltipText?: string;
    controlRef?: Ref<HTMLElement>;
    isLoading?: boolean;
    noCloseOnClickInside?: boolean;
    blackTooltip?: boolean;
    closeTimeOut?: number;
};

const TooltipWrapper = ({
    children,
    tooltipText,
    controlRef,
    isLoading,
    noCloseOnClickInside,
    blackTooltip,
    closeTimeOut,
}: TooltipWrapperProps): JSX.Element => {
    const [show, setShow] = useState(false);

    const onOpenTooltip = () => {
        setShow(true);
    };
    const onCloseTooltip = () => {
        setShow(false);
    };

    const onClickInside = closeTimeOut
        ? () => {
              setTimeout(() => {
                  onCloseTooltip();
              }, closeTimeOut);
          }
        : null;

    useEffect(() => {
        onCloseTooltip();
    }, [isLoading]);

    return (
        <>
            {children &&
                React.Children.map(children, (el: React.ReactElement<any>) => {
                    return (
                        <>
                            {React.cloneElement(el, {
                                ...el.props,
                                onMouseEnter: onOpenTooltip,
                                onMouseLeave: onCloseTooltip,
                                onClick: onOpenTooltip,
                            })}
                            <FloatingTooltip
                                text={tooltipText}
                                show={show}
                                controlRef={controlRef}
                                onOpenTooltip={onOpenTooltip}
                                onCloseTooltip={onCloseTooltip}
                                onClickInside={onClickInside}
                                noCloseOnClickInside={noCloseOnClickInside}
                                blackTooltip={blackTooltip}
                            />
                        </>
                    );
                })}
        </>
    );
};

export default TooltipWrapper;
