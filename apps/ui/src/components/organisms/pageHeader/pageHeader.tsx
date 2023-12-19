import { useState } from 'react';
import { Button } from '../../atoms/button';
import { Variant } from '../../atoms/button/types';
import { ConnectWalletButton } from '../../molecules/connectWalletButton';
import SendComponent from '../../molecules/sendComponent';

import style from './index.module.css';

const PageHeader = () => {
    const [openStakeModul, setOpenStaekeModul] = useState<boolean>(false);

    return (
        <div className={style.wrapper}>
            <ConnectWalletButton />
            <Button text="Send" variant={Variant.light} />
            <Button text="Stake" variant={Variant.blue} onClick={() => setOpenStaekeModul(true)} />
            <SendComponent
                open={openStakeModul}
                setShowPopup={() => setOpenStaekeModul(!openStakeModul)}
                recipient={'B62qoTtn6hP2R1x5d4UQoJos9vjoNGxLhaQn5cSKneu25Q3wpmtPirT'}
            />
        </div>
    );
};

export default PageHeader;
