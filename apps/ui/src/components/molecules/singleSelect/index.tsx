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
    notActive?: boolean;
    disable?: boolean;
    minWidth?: string;
    maxHeight?: string;
    btnHeight?: string;
    className?: string;
};

const SingleSelect = ({
    options,
    selectTitle = '',
    onChange,
    initValue,
    notActive,
    disable,
    minWidth,
    maxHeight,
    btnHeight,
    className,
}: SingleSelectProps): JSX.Element => {
    const [selected, setSelected] = useState<any>(initValue);
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
                clickHandler={() => setExpanded(!expanded)}
                expanded={expanded}
                title={findTextByValue(selected) || selectTitle}
                isActive={notActive !== null && notActive !== undefined ? !notActive : findTextByValue(selected)}
                disable={disable}
                minWidth={minWidth}
                height={btnHeight}
            />
            <DropdownWrapper
                maxHeight={maxHeight ?? '160px'}
                minWidth={minWidth ?? '150px'}
                className={style.dropdown}
                onClose={() => setExpanded(false)}
                show={expanded}
                parentRef={ref}
            >
                <CustomScrollList maxHeight={maxHeight ?? '160px'} style={{ display: 'block' }}>
                    {options?.map((el) => (
                        <div
                            key={el.value}
                            className={style.item}
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
