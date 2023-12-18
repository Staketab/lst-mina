import Image from 'next/image';
import auroIcon from './img/auro.png';
import { StaticEllipse } from '../staticEllipse';
import disconnect from './img/disconnect.svg';
import profile from './img/profile.svg';
import copy from './img/copy.svg';

import style from './index.module.css';
import DropdownWrapper from '../dropdownWrapper';
import { useRef, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

const ButtonWithAddress = ({ address, onDisconnect }: { address: string; onDisconnect: () => void }) => {
    const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
    const handleCLick = () => {
        setIsShowDropdown(!isShowDropdown);
    };
    const refTest = useRef();
    const router = useRouter();

    return (
        <>
            <div className={style.buttonWithAddress} onClick={handleCLick} ref={refTest}>
                <Image src={auroIcon} alt="" className={style.auroIcon} />
                <StaticEllipse text={address} view={{ sm: 7, md: 9, lg: 9 }} />
                <DropdownWrapper
                    className={style.dropdownWrapper}
                    show={isShowDropdown}
                    onClose={() => setIsShowDropdown(false)}
                    parentRef={refTest}
                    minWidth="185px"
                >
                    <div
                        className={classNames(style.item, 't-inter-semi-bold')}
                        onClick={() => {
                            navigator.clipboard.writeText(address);
                            setIsShowDropdown(false);
                        }}
                    >
                        <Image src={copy} alt="" className={style.icon} />
                        Copy address
                    </div>
                    <div
                        className={classNames(style.item, 't-inter-semi-bold')}
                        onClick={() => {
                            setIsShowDropdown(false);
                            router.push('https://minascan.io/testworld/account/' + address);
                        }}
                    >
                        <Image src={profile} alt="" className={style.icon} />
                        Profile
                    </div>
                    {onDisconnect && (
                        <div
                            className={classNames(style.item, 't-inter-semi-bold')}
                            onClick={() => {
                                onDisconnect();
                                setIsShowDropdown(false);
                            }}
                        >
                            <Image src={disconnect} alt="" className={style.icon} />
                            Disconnect
                        </div>
                    )}
                </DropdownWrapper>
            </div>
        </>
    );
};

export default ButtonWithAddress;
