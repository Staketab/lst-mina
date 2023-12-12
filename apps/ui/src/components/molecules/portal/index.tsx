import { useEffect } from 'react';
import reactDom from 'react-dom';
import './index.module.css';

const Portal = ({
    children,
    onClick,
    customTop,
    customClass,
    height,
}: {
    children: React.ReactNode;
    onClick?: (value: any) => void;
    customTop?: string;
    customClass?: string;
    height?: string;
}) => {
    const elem = document.createElement('div');
    elem.classList.add('portal');
    if (height !== null && height !== undefined) elem.style.height = height;

    if (customTop) {
        setTimeout(() => {
            document.querySelector('.portal').classList.add(customClass);
            (document.querySelector(`.${customClass}`) as HTMLElement).style.top = `${customTop}px`;
            (document.querySelector(`.${customClass}`) as HTMLElement).style.height = `calc(100% - ${customTop}px)`;
        }, 0);
    }
    useEffect(() => {
        elem.addEventListener('click', onClick);
        document.body.appendChild(elem);
        return () => {
            elem.removeEventListener('click', onClick);
            document.querySelector('.portal').remove();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return reactDom.createPortal(children, elem);
};

export default Portal;
