import React, { useRef, useEffect, useState } from 'react';
import styles from './accountName.module.css';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ValidatorAvatar from '../../molecules/validatorAvatar';
import { CopyIcon } from '../../molecules/copyIcon';
import { TruncateText } from '../../molecules/truncateText';
import MiddleEllipsisCustom from '../../molecules/middleEllipsis';
import { StaticEllipse } from '../../molecules/staticEllipse';
import { View } from '../../../comman/types';

type AccountNameProps = {
    className?: string;
    pk?: string;
    name?: string;
    img?: string;
    noRedirect?: boolean;
    getRedirectLink?: (value: string) => string;
    redirect?: string;
    needTabRedirect?: boolean;
    view: View;
};
export default function AccountName({
    className,
    pk,
    name,
    img,
    noRedirect,
    redirect,
    view,
}: AccountNameProps): JSX.Element {
    const wrapperRef = useRef(null);
    const ref = useRef();
    const { pathname } = useRouter();

    const ellipsis = ({ text }: { text?: string; noRedirect?: boolean }) => {
        return <StaticEllipse text={text} view={view} />;
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
