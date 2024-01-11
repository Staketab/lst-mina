import React from 'react';
import StringTemplate from './stringTemplate';
import AccountTemplate from './accountTemplate/accountTemplate';
import AmountTemplate from './amountTemplate';

export enum TableTemplates {
    STRING = 'string',
    ACCOUNT_TEMPLATE = 'accountTemplate',
    AMOUNT = 'amount',
}

const TableColumn = ({ data, config, index }) => {
    const getTemplate = (data, config, index) => {
        switch (config.columnTemplate) {
            case TableTemplates.STRING:
                return <StringTemplate key={config.colName + '-col-' + index} data={data} config={config} />;
            case TableTemplates.ACCOUNT_TEMPLATE:
                return <AccountTemplate key={config.colName + '-col-' + index} data={data} config={config} />;
            case TableTemplates.AMOUNT:
                return <AmountTemplate key={config.colName + '-col-' + index} data={data} config={config} />;
        }
    };

    return <>{getTemplate(data, config, index)}</>;
};

export default TableColumn;
