import React from 'react';
import { colorConfig, disabledColor } from './constants';

type LoaderProps = {
    label?: string;
    disabled?: boolean;
    dotCount?: number;
    radius?: number;
    gap?: number;
    duration?: number;
};
const Loader = ({ label, disabled, dotCount = 5, radius = 3, gap = 8, duration = 2000 }: LoaderProps): JSX.Element => {
    const r = radius;
    const g = gap;
    const colors = colorConfig.blue;

    const getCX = (r, g, i) => r + (r * 2 + g) * i;
    const width = getCX(r, g, dotCount - 1) + r;

    const getCircles = (count) => {
        const arr = [];

        for (let i = 0; i < count; i++) {
            let values = [];
            for (let index = 0; index < count * 2 - 1; index++) {
                values.push(index < i || index > count + i - 1 ? 0 : 1);
            }
            values = [0, ...values, 0];
            arr.push(
                <circle
                    cx={getCX(r, g, i)}
                    cy={r}
                    r={r}
                    fill={!disabled ? colors[i] ?? colors.at(-1) : disabledColor}
                    key={i}
                >
                    {!disabled && (
                        <animate
                            attributeName="opacity"
                            begin="0s"
                            dur={duration + 'ms'}
                            values={values.join(';')}
                            calcMode="linear"
                            repeatCount="indefinite"
                        />
                    )}
                </circle>
            );
        }
        return arr;
    };

    return (
        <svg
            height={r * 2}
            width={width}
            viewBox={`0 0 ${width} ${r * 2}`}
            xmlns="http://www.w3.org/2000/svg"
            aria-label={label}
        >
            {getCircles(dotCount)}
        </svg>
    );
};

export default Loader;
