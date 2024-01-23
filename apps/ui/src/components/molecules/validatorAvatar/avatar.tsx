import defaultImg from './img/avatar.png';
import Image from 'next/image';
import { blurHash } from './constants';
import style from './index.module.css';

type ValidatorAvatarProps = {
    avatar?: string;
};

const ValidatorAvatar = ({ avatar }: ValidatorAvatarProps): JSX.Element => {
    const defaultAvatar = defaultImg;

    return (
        <Image
            className={style.avatar}
            src={avatar ? avatar : defaultAvatar}
            alt=""
            width={18}
            height={18}
            placeholder="blur"
            blurDataURL={blurHash}
        />
    );
};

export default ValidatorAvatar;
