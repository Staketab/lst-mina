import classNames from 'classnames';
import style from './index.module.css';

type Button = {
    text: string;
    onClick: () => void;
    className?: string;
};

const Button = ({ text, onClick, className }: Button): JSX.Element => {
    return (
        <button onClick={onClick} className={classNames(style.button, className, 't-inter-semi-bold')}>
            {text}
        </button>
    );
};

export default Button;
