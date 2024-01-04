import classNames from 'classnames';
import style from './index.module.css';

type InputProps = {
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    placeholder: string;
    value: string | number;
    className?: string;
    type?: string;
    disabled?: boolean;
};

const Input = ({ onChange, placeholder, value, className, type, disabled }: InputProps): JSX.Element => {
    return (
        <input
            className={classNames(style.input, className)}
            onChange={onChange}
            placeholder={placeholder}
            value={value}
            type={type}
            disabled={disabled}
        />
    );
};

export default Input;
