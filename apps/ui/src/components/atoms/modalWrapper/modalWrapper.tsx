import { ReactNode } from 'react';
import style from './index.module.css';

const ModalWrapper = ({ children }: { children: ReactNode }): JSX.Element => {
    return <div className={style.wrapper}>{children}</div>;
};

export default ModalWrapper;
