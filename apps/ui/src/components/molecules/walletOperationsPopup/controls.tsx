import { Button } from '../../atoms/button';
import { Variant } from '../../atoms/button/types';
import style from './WalletOperationsPopup.module.css';

const StakePopupControls = ({ onCancel, onNext, title = 'Next', nextDisabled = false }) => {
    return (
        <div className={style.walletOperationsPopupControls}>
            <Button text="Cancel" onClick={onCancel} variant={Variant.light} />
            <Button text={title} onClick={onNext} disabled={nextDisabled} />
        </div>
    );
};

export default StakePopupControls;
