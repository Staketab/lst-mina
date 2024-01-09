import React, { useEffect, useRef, useState } from 'react';
import style from './SingleSelect.module.css';
import DropdownWrapper from '../dropdownWrapper/index';
import classNames from 'classnames';
import { useHandleClickOutside, useMedia } from '../../../hooks';
import SelectPlate from '../selectPlate';
import CustomScrollList from '../customScrollList';
import { LimitOptions } from '../../../comman/types';

type SingleSelectProps = {
    options: LimitOptions;
    selectTitle?: string;
    onChange: (value: any) => void;
    initValue?: number;
    disable?: boolean;
    className?: string;
};

const SingleSelect = ({
    options,
    selectTitle = '',
    onChange,
    initValue,
    disable,
    className,
}: SingleSelectProps): JSX.Element => {
    const [selected, setSelected] = useState<number>(initValue);
    const [expanded, setExpanded] = useState(false);
    const ref = useRef();
    const media = useMedia(0);

    const findTextByValue = (val) => {
        if (!options || (!val && val !== 0)) return null;
        const res = options.filter((elem) => Object.values(elem).indexOf(val) > -1);
        if (res.length > 0) return res[0].text;
        return null;
    };

    useEffect(() => {
        setSelected(initValue);
    }, [initValue]);

    const clickHandler = (data) => {
        if (!disable) {
            setSelected(data);
            onChange(data);
            setExpanded(false);
        }
    };

    useHandleClickOutside(ref.current, () => (media.greater.sm ? setExpanded(false) : null));

    return (
        <div className={classNames(style.singleSelect, className)} ref={ref}>
            <SelectPlate
                onClick={() => setExpanded(!expanded)}
                expanded={expanded}
                title={findTextByValue(selected) || selectTitle}
                disable={disable}
            />
            <DropdownWrapper className={style.dropdown} onClose={() => setExpanded(false)} show={expanded}>
                <CustomScrollList>
                    {options?.map((el) => (
                        <div
                            key={el.value}
                            className={classNames(style.item, 't-inter-regular')}
                            onClick={() => {
                                clickHandler(el.value);
                            }}
                        >
                            {el.text}
                        </div>
                    ))}
                </CustomScrollList>
            </DropdownWrapper>
        </div>
    );
};

export default SingleSelect;
