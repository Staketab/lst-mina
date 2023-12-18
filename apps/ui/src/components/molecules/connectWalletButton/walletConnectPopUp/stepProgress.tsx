import style from './WalletConnectPopUp.module.css';

const lineStyles = [
    {
        width: '0.1%',
        background: 'linear-gradient(90deg, #597FFF 0%, #4FB8CF 100%)',
    },
    {
        width: '50%',
        background: 'linear-gradient(90deg, #597FFF 0%, #4FB8CF 100%)',
    },
    {
        width: '100%',
        background: 'linear-gradient(90deg, #597FFF 0%, #4FB8CF 49.79%, #7DD3A1 100%)',
    },
];

const WalletConnectPopUpProgress = ({ step }: { step: number }): JSX.Element => {
    return (
        <div className={style.stepProgress}>
            <div className={style.stepProgressPlate}>
                <div className={style.stepProgressLine}></div>
                <div
                    className={style.stepProgressLineColor}
                    style={lineStyles[Math.min(step, lineStyles.length - 1)]}
                ></div>
                <div className={style.stepProgressDot} style={{ left: `calc(${0}% - 7px)` }}>
                    <div
                        className={style.stepProgressCircle}
                        style={{
                            backgroundColor: step >= 0 ? 'rgba(89, 127, 255, 1)' : 'transparent',
                        }}
                    ></div>
                </div>
                <div className={style.stepProgressDot} style={{ left: `calc(${50}% - 7px)` }}>
                    <div
                        className={style.stepProgressCircle}
                        style={{
                            backgroundColor: step >= 1 ? 'rgba(89, 127, 255, 1)' : 'transparent',
                        }}
                    ></div>
                </div>
                <div className={style.stepProgressDot} style={{ left: `calc(${100}% - 7px)` }}>
                    <div
                        className={style.stepProgressCircle}
                        style={{
                            backgroundColor: step >= 2 ? 'rgba(89, 127, 255, 1)' : 'transparent',
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default WalletConnectPopUpProgress;
