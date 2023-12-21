import React, { useState } from 'react';
import classNames from 'classnames';

import styles from './index.module.css';
import { TabSwitcherOptions } from '../../../comman/types';

type TabSwitcher = {
    initialValue?: string;
    options: TabSwitcherOptions;
    onClick: (value: string) => void;
};

const TabSwitcher = ({ options, onClick }: TabSwitcher): JSX.Element => {
    const [current, setCurrent] = useState(options[0]);

    const handleClick = (value: string): void => {
        setCurrent(value);
        onClick(value);
    };

    return (
        <div className={classNames(styles.doubleTabSwitcher, 't-inter-medium')}>
            {options.map((value) => (
                <div
                    key={value}
                    className={classNames(styles.tab, {
                        [styles.tabActive]: current === value,
                    })}
                    onClick={() => handleClick(value)}
                >
                    {value}
                </div>
            ))}
        </div>
    );
};

export default TabSwitcher;
