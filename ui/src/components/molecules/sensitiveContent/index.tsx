import React, { useState, useEffect } from 'react';
import Background from './img/background.png';
import EyeIcon from './img/eyeIcon.svg';

import style from './index.module.css';
import Image from 'next/image';
import classNames from 'classnames';

const SensitiveContent = ({ show, onShowClick, size, position }) => {
    const [neededSize, setNeededSize] = useState(size ?? 'large');

    useEffect(() => {
        setNeededSize(size);
    }, [size]);

    return show ? (
        <div className={style.senseContent} style={position ? { position } : null}>
            <Image src={Background} className={style.background} alt="background" />
            <div className={style.info}>
                <Image
                    src={EyeIcon}
                    alt=""
                    style={{
                        width: neededSize === 'large' ? 18 : 14,
                        height: neededSize === 'large' ? 18 : 14,
                        cursor: neededSize === 'small' ? 'pointer' : 'auto',
                    }}
                    onClick={() => (neededSize === 'small' ? onShowClick() : null)}
                />
                {neededSize !== 'small' && (
                    <div className={classNames('t-inter-semi-bold', style.infoTitle)}>Sensitive Content</div>
                )}
                {neededSize === 'large' && (
                    <div className={classNames('t-inter-medium', style.infoText)}>
                        This image contains sensitive content which some people may find offensive or disturbing
                    </div>
                )}
                {neededSize !== 'small' && (
                    <div
                        className={classNames('t-inter-semi-bold', style.infoBtn)}
                        id="show-sensitive-btn"
                        onClick={onShowClick}
                    >
                        Show
                    </div>
                )}
            </div>
        </div>
    ) : null;
};

export default SensitiveContent;
