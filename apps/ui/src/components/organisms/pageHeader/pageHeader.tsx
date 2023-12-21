import { useState } from 'react';
import { Button } from '../../atoms/button';
import { Variant } from '../../atoms/button/types';
import { ConnectWalletButton } from '../../molecules/connectWalletButton';
import { StakeModal } from '../../molecules/stakeModal';

import style from './index.module.css';

const PageHeader = () => {
    const [openStakeModul, setOpenStaekeModul] = useState<boolean>(false);
    const [isDisableStakeButton, setIsDisableStakeButton] = useState(true);

    return (
        <div className={style.wrapper}>
            <ConnectWalletButton handleAddress={setIsDisableStakeButton} />
            <Button
                className={style.stakeButton}
                text="Stake"
                variant={Variant.blue}
                onClick={() => setOpenStaekeModul(true)}
                disabled={isDisableStakeButton}
            />
            <StakeModal open={openStakeModul} setShowPopup={() => setOpenStaekeModul(false)} />
        </div>
    );
};

export default PageHeader;
