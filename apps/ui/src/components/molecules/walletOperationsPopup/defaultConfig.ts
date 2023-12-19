export const validatorConfig = [
    {
        colName: 'validator',
        columnTemplate: 'accountBigStatic',
        fields: {
            name: 'validatorName',
            img: 'validatorImg',
            pk: 'address',
            redirect: 'validator',
        },
        headerText: 'validator',
        view: {
            sm: 8,
            md: 8,
            lg: 8,
        },
    },
    {
        colName: 'APY',
        columnTemplate: 'amount',
        fields: {
            value: 'apy',
            toFixed: 3,
            percent: true,
        },
        headerText: 'APY',
        style: {
            noGrow: true,
        },
    },
];

export const defaultPopupConfig = {
    stake: {
        titleFee: 'Estimated Fee',
        tooltipFee: null,
        tooltipAPY: null,
        tooltipTotalStaked: null,
    },
};
