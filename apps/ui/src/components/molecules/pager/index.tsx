import classNames from 'classnames';
import React from 'react';
import style from './Pager.module.css';
import ArrowIcon from './img/ArrowIcon.svg';
import { useMedia } from '../../../hooks';
import Image from 'next/image';

type PagerProps = {
    page: number;
    count?: number;
    onChange: (value: number) => void;
    pageNeighbours?: number;
};

const Pager = ({ page, count = 1, onChange, pageNeighbours = 1 }: PagerProps): JSX.Element => {
    const showPrevButton = page !== 1;
    const showNextButton = count !== page;
    const media = useMedia();

    const ELLIPSIS = '...';

    const range = (from, to, step = 1) => {
        let i = from;
        const range = [];

        while (i <= to) {
            range.push(i);
            i += step;
        }

        return range;
    };

    const fetchPageNumbers = () => {
        const totalNumbers = pageNeighbours * 2 + 3;
        const totalBlocks = totalNumbers + 2;

        if (count > totalBlocks) {
            const startPage = Math.max(2, page - pageNeighbours);
            const endPage = Math.min(count - 1, page + pageNeighbours);
            let pages = range(startPage, endPage);
            const hasLeftSpill = startPage > 2;
            const hasRightSpill = count - endPage > 1;
            const spillOffset = totalNumbers - (pages.length + 1);
            switch (true) {
                case hasLeftSpill && !hasRightSpill: {
                    const extraPages =
                        (page + 1 + '').length > 3 && !media.greater.sm
                            ? range(startPage - spillOffset + 2, startPage - 1)
                            : range(startPage - spillOffset, startPage - 1);
                    pages = [ELLIPSIS, ...extraPages, ...pages];
                    break;
                }
                case !hasLeftSpill && hasRightSpill: {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    pages = [...pages, ...extraPages, ELLIPSIS];
                    break;
                }

                case hasLeftSpill && hasRightSpill:
                default: {
                    (page + 1 + '').length > 3 && !media.greater.sm
                        ? (pages = [ELLIPSIS, pages[1], ELLIPSIS])
                        : (pages = [ELLIPSIS, ...pages, ELLIPSIS]);
                    break;
                }
            }

            return [1, ...pages, count];
        }

        return range(1, count);
    };

    const changeHandler = (value) => {
        if (value > count || value < 1) return;
        onChange(value - 1);
    };

    return (
        <div className={style.pager}>
            {showPrevButton && (
                <button
                    className={classNames('t-inter-medium', style.control, style.btn)}
                    onClick={() => changeHandler(page - 1)}
                >
                    <Image src={ArrowIcon} alt="" style={{ transform: 'rotateY(180deg)' }} />
                </button>
            )}

            {fetchPageNumbers().map((el, i) => {
                if (el === ELLIPSIS)
                    return (
                        <button key={el + i} className={classNames('t-inter-medium', style.btn, style.ellipsis)}>
                            {el}
                        </button>
                    );

                return (
                    <button
                        key={el}
                        className={classNames('t-inter-medium', style.btn, {
                            [style.active]: page === el,
                        })}
                        onClick={() => changeHandler(el)}
                    >
                        {el}
                    </button>
                );
            })}

            {showNextButton && (
                <button
                    className={classNames('t-inter-medium', style.control, style.btn)}
                    onClick={() => changeHandler(page + 1)}
                >
                    <Image src={ArrowIcon} alt="" />
                </button>
            )}
        </div>
    );
};

export default Pager;
