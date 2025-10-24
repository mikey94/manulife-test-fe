import styles from './Input.module.scss';

interface InputProps {
    placeholder: string;
    value: string | number | readonly string[] | undefined;
    onChangeValue: (value: string | number | undefined) => void;
}

const Input = ({ placeholder, value, onChangeValue }: InputProps) => {
    return (
        <input className={styles.input} placeholder={placeholder} defaultValue={value} onChange={ (e) => onChangeValue(e.target.value) } />
    );
}

export default Input;