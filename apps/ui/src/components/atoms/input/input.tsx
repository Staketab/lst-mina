type InputProps = {
    onChange: () => void;
    placeholder: string;
    value: string;
};

const Input = ({ onChange, placeholder, value }: InputProps): JSX.Element => {
    return <input onChange={onChange} placeholder={placeholder} value={value} />;
};

export default Input;
