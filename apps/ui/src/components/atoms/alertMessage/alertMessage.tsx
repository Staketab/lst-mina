import classNames from 'classnames';
import infoIcon from './InfoIcon.svg';
import style from './index.module.css';
import Image from 'next/image';

export enum VariantsAlertMessage {
    WARNING = 'warning',
    ERROR = 'error',
}

export const AlertMessage = ({
    variant,
    text,
    className,
}: {
    variant: VariantsAlertMessage;
    text: string;
    className?: string;
}) => {
    return (
        <div className={classNames(style.wrapper, style[variant], 't-inter-medium', className)}>
            <Image src={infoIcon} alt="" className={style.icon} />
            {text}
        </div>
    );
};
