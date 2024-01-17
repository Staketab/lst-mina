import React from 'react';
import StringTemplate from './stringTemplate';
import AccountTemplate from './accountTemplate/accountTemplate';
import AmountTemplate from './amountTemplate';

export enum TableTemplates {
    STRING = 'string',
    ACCOUNT_TEMPLATE = 'accountTemplate',
    AMOUNT = 'amount',
}

const getCell = ({ data, config }): JSX.Element => {
    switch (config.columnTemplate) {
        case TableTemplates.STRING:
            return <StringTemplate data={data} config={config} />;
        case TableTemplates.ACCOUNT_TEMPLATE:
            return <AccountTemplate data={data} config={config} />;
        case TableTemplates.AMOUNT:
            return <AmountTemplate data={data} config={config} />;
    }
};

export default getCell;
