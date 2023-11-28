import React from 'react';
import StringTemplate from './stringTemplate';
import AccountTemplate from './accountTemplate/accountTemplate';
import AmountTemplate from './amountTemplate';

const TableColumn = ({ data, config, index }) => {
    const getTemplate = (data, config, index) => {
        switch (config.columnTemplate) {
            case 'string':
                return <StringTemplate key={config.colName + '-col-' + index} data={data} config={config} />;
            case 'accountTemplate':
                return <AccountTemplate key={config.colName + '-col-' + index} data={data} config={config} />;
            case 'amount':
                return <AmountTemplate key={config.colName + '-col-' + index} data={data} config={config} />;
        }
    };

    return <>{getTemplate(data, config, index)}</>;
};

export default TableColumn;
