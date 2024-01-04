import classNames from 'classnames';
import React, { ReactNode } from 'react';
import style from './Table.module.css';
import { TableConfig } from '../../../comman/types';

type ColumnWrapperProps = {
    children: ReactNode;
    config: TableConfig;
    setHovered: (valule: boolean) => void;
    hovered?: boolean;
    isFirst?: boolean;
    isLast?: boolean;
    disableBorder?: boolean;
};

const ColumnWrapper = ({
    children,
    config,
    setHovered,
    hovered,
    isFirst,
    isLast,
    disableBorder,
}: ColumnWrapperProps): JSX.Element => {
    const radius = hovered && (isFirst ? '9px 0 0 9px' : isLast && '0 9px 9px 0');

    const tabletWidth = config.style?.width;

    const tabletMinWidth = config.style?.minWidth;

    const backgroundColorHovered = (hovered && '#FAFAFC') || '#fff';
    return (
        <div
            className={classNames(style.column, style.cell)}
            style={{
                backgroundColor: backgroundColorHovered,
                borderRadius: radius,
                borderBottom: disableBorder ? '0.5px solid #fff' : null,
                paddingLeft: '16px',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                className={style.cellContentWrapper}
                style={{
                    ...config?.style,
                    width: tabletWidth,
                    minWidth: tabletMinWidth,
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default ColumnWrapper;
