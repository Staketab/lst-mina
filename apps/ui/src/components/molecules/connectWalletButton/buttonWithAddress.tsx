import Image from 'next/image';
import auroIcon from './img/auro.png';
import { StaticEllipse } from '../staticEllipse';
import disconnect from './img/disconnect.svg';
import copy from './img/copy.svg';

import style from './index.module.css';
import DropdownWrapper from '../dropdownWrapper';
import { useRef, useState } from 'react';
import classNames from 'classnames';
import { Button } from '../../atoms/button';
import { Variant } from '../../atoms/button/types';

const ButtonWithAddress = ({ address, onDisconnect }: { address: string; onDisconnect: () => void }) => {
    const [isShowDropdown, setIsShowDropdown] = useState<boolean>(false);
    const handleCLick = () => {
        setIsShowDropdown(!isShowDropdown);
    };
    const refTest = useRef();

    return (
        <>
            <Button className={style.buttonWithAddress} onClick={handleCLick} variant={Variant.blue}>
                <div ref={refTest}>
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
            </Button>
        </>
    );
};

export default ButtonWithAddress;
