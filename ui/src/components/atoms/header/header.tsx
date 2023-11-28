import classNames from 'classnames';
import styles from './index.module.css';

const Header = ({ title, className }: { title: string; className?: string }): JSX.Element => {
    return <div className={classNames('t-inter-semi-bold', styles.header, className)}>{title}</div>;
};

export default Header;
