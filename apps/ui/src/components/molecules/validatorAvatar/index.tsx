import React from 'react';
import defaultImg from './img/avatar.png';
import Image from 'next/image';
import { blurHash } from './constants';

type ValidatorAvatarProps = {
    avatar?: string;
};

const ValidatorAvatar = ({ avatar }: ValidatorAvatarProps): JSX.Element => {
    const defaultAvatar = defaultImg;

    return (
        <div>
            <Image
                src={avatar ? avatar : defaultAvatar}
                alt=""
                width={18}
                height={18}
                placeholder="blur"
                blurDataURL={blurHash}
            />
        </div>
    );
};

export default ValidatorAvatar;
