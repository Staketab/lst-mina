import Image from 'next/image';
import logo from '../../../../public/assets/MinaLogo.svg';

const Logo = ({ className }: { className?: string }): JSX.Element => {
    return <Image src={logo} alt="Mina" className={className} />;
};

export default Logo;
