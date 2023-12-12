import classNames from 'classnames';
import React from 'react';
import style from './Table.module.css';
import { useMedia } from '../../../hooks';

const ColumnWrapper = ({
    children,
    config,
    data,
    rowIndex,
    setHovered,
    hovered,
    active,
    isFirst,
    isLast,
    disableBorder,
    onRowClick,
}) => {
    const {
        greater: { sm: smScreen, lg: lgScreen },
    } = useMedia();

    const radius = hovered && (isFirst ? '9px 0 0 9px' : isLast && '0 9px 9px 0');
    const mobilePaddingRight = !smScreen && config.style?.mobilePaddingRight;
    const tabletPaddingRight =
        (smScreen && !lgScreen && config.style?.tabletPaddingRight) || config.style?.paddingRight;

    const mobileWidth = !smScreen && config.style?.mobileWidth;
    const tabletWidth = (smScreen && !lgScreen && config.style?.tabletWidth) || config.style?.width;

    const mobileMinWidth = !smScreen && config.style?.mobileMinWidth;
    const tabletMinWidth = (smScreen && !lgScreen && config.style?.tabletMinWidth) || config.style?.minWidth;

    const backgroundColorActive = active && '#F7F9FF';
    const backgroundColorHovered = (hovered && '#FAFAFC') || '#fff';
    return (
        <div
            className={classNames(style.column, style.cell)}
            style={{
                backgroundColor: backgroundColorActive || backgroundColorHovered,
                paddingRight: mobilePaddingRight || tabletPaddingRight,
                borderRadius: radius,
                borderBottom: disableBorder ? '0.5px solid #fff' : null,
                paddingLeft: isFirst ? '16px' : config.style?.paddingLeft,
                cursor: onRowClick ? 'pointer' : 'normal',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onRowClick ? () => onRowClick(data, rowIndex) : null}
        >
            <div
                className={style.cellContentWrapper}
                style={{
                    ...config?.style,
                    width: mobileWidth || tabletWidth,
                    minWidth: mobileMinWidth || tabletMinWidth,
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default ColumnWrapper;
