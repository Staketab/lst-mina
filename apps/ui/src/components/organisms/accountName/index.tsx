import React, { useRef, useEffect, useState } from 'react';
import styles from './accountName.module.css';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ValidatorAvatar from '../../molecules/validatorAvatar';
import { CopyIcon } from '../../molecules/copyIcon';
import { TruncateText } from '../../molecules/truncateText';
import MiddleEllipsisCustom from '../../molecules/middleEllipsis';

type AccountNameProps = {
    className?: string;
    pk?: string;
    name?: string;
    img?: string;
    noRedirect?: boolean;
    getRedirectLink?: (value: string) => string;
    redirect?: string;
    needTabRedirect?: boolean;
};
export default function AccountName({ className, pk, name, img, noRedirect, redirect }: AccountNameProps): JSX.Element {
    const wrapperRef = useRef(null);
    const ref = useRef();
    const offsetWidth = wrapperRef?.current?.offsetWidth;
    const [width, setWidth] = useState<string | number>('100%');
    const { pathname } = useRouter();

    const getWidth = (offsetWidth) => {
        let arr = [];
        if (wrapperRef.current?.children && Array.from(wrapperRef?.current?.children.length)) {
            arr = Array.from(wrapperRef.current?.children).slice(1);
        } else if (wrapperRef.current?.children) {
            arr = Array.from(wrapperRef.current?.children);
        }
        const excessWidth = arr.reduce((acc, elem) => {
            let result = acc;
            return (result += elem?.offsetWidth);
        }, 0);
        setWidth(offsetWidth - excessWidth);
    };

    useEffect(() => {
        getWidth(offsetWidth);
    }, [offsetWidth]);

    const ellipsis = ({ text, noRedirect }: { text?: string; noRedirect?: boolean }) => {
        return (
            <MiddleEllipsisCustom width={width} noRedirect={noRedirect} fontWeight={500} fontSize={'14px'}>
                {text}
            </MiddleEllipsisCustom>
        );
    };

    const redirectLink = `/${redirect}`;

    const isCurrentPathname = pathname.includes(redirectLink);
    const finalNoRedirect = noRedirect || isCurrentPathname;

    return (
        <div className={classNames(styles.accountName, { [className]: className })} ref={ref}>
            <div className={styles.wrapper}>
                {name === null || name === undefined ? null : (
                    <div className={styles.nameRow}>
                        <ValidatorAvatar avatar={img} width={'18px'} height={'18px'} />
                        {finalNoRedirect ? (
                            <span className={classNames(styles.name, styles.nameNoRedirect)}>
                                <TruncateText>{name}</TruncateText>
                            </span>
                        ) : (
                            <Link href={redirectLink} className={styles.name}>
                                <TruncateText>{name}</TruncateText>
                            </Link>
                        )}
                    </div>
                )}
                {pk ? (
                    <div className={styles.pkRow} ref={wrapperRef}>
                        {finalNoRedirect ? (
                            <div
                                className={styles.pk}
                                style={{
                                    minWidth: 87,
                                }}
                            >
                                {ellipsis({
                                    text: pk,
                                    noRedirect: true,
                                })}
                            </div>
                        ) : (
                            <Link
                                href={redirectLink}
                                className={styles.pkLink}
                                style={{
                                    minWidth: 87,
                                }}
                            >
                                {ellipsis({
                                    text: pk,
                                })}
                            </Link>
                        )}
                        <CopyIcon
                            onClick={() => {
                                navigator.clipboard.writeText(pk);
                            }}
                        />
                    </div>
                ) : (
                    '-'
                )}
            </div>
        </div>
    );
}
