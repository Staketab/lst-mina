import React, { useState, useEffect, useMemo } from 'react';
import defaultImg from './img/avatar.png';
import ImgSuspense from '../imageSuspense';
import classNames from 'classnames';
import style from './index.module.css';

type ValidatorAvatarProps = {
    doubleImg?: boolean;
    avatar?: string;
    width?: string;
    height?: string;
    square?: boolean;
    className?: string;
    isCoinTable?: boolean;
    isLoading?: boolean;
};

const isEmpty = (str) => str.trim() === '';

const ValidatorAvatar = ({
    doubleImg = false,
    avatar,
    width: propsWidth,
    height,
    square,
    className,
    isCoinTable,
    isLoading,
}: ValidatorAvatarProps): JSX.Element => {
    const width = Number(parseFloat(propsWidth));
    const iconsOffset = Number(width) >= 20 ? 8 : 6;
    const isAvatar = (avatar && !isEmpty(avatar)) || (square && avatar !== undefined) || isLoading;
    const [isErrorFirst, setIsErrorFirst] = useState(false);
    const defaultAvatar = defaultImg;
    const placeholder = isLoading ? avatar : isCoinTable;

    useEffect(() => {
        setIsErrorFirst(false);
    }, [avatar]);

    const avatarCurrent: any = useMemo(() => {
        if (isErrorFirst) return placeholder;
        return isAvatar ? avatar : defaultAvatar;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [avatar, isErrorFirst]);

    return (
        <div
            style={{
                width: !doubleImg ? width : width * 2 - iconsOffset,
            }}
            className={style.wrapper}
        >
            <div
                style={{
                    width: `${width}px`,
                    height: height,
                }}
                className={classNames(style.iconFirst, className)}
            >
                <ImgSuspense
                    style={{
                        objectFit: 'cover',
                        width: width,
                        height: height,
                        minWidth: width,
                        borderRadius: square ? 0 : '50%',
                    }}
                    src={avatarCurrent ? avatarCurrent : defaultAvatar}
                    onError={() => {
                        setIsErrorFirst(true);
                    }}
                    loaderStyle={{ width: width, height: height }}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default ValidatorAvatar;
