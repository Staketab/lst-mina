import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import styles from './index.module.css';
import { TabSwitcherOptions } from '../../../comman/types';

type TabSwitcher = {
    initialValue?: string;
    options: TabSwitcherOptions;
    onClick: (value: string) => void;
    disabled?: boolean;
};

const TabSwitcher = ({ initialValue, options, onClick, disabled }: TabSwitcher): JSX.Element => {
    const [current, setCurrent] = useState(initialValue);

    useEffect(() => {
        setCurrent(!initialValue ? options[0].value : initialValue);
    }, [initialValue]);

    const clickOption = (val) => {
        setCurrent(val);
        onClick(val);
    };

    return (
        <div className={classNames(styles.doubleTabSwitcherWrapper, 't-inter-medium')}>
            <div className={styles.doubleTabSwitcher}>
                {options.map((elem) => (
                    <div
                        key={elem.value}
                        className={classNames(styles.tab, {
                            [styles.tabActive]: current === elem.value && !disabled,
                            [styles.tabActiveDisabled]: current === elem.value && disabled,
                            [styles.tabDisabledNotSelected]: current !== elem.value && disabled,
                        })}
                        onClick={() => (disabled ? null : clickOption(elem.value))}
                    >
                        {elem.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TabSwitcher;
