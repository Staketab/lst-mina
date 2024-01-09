import { SORT_BY, TableConfig } from '../types';

export const ScoringConfig: TableConfig[] = [
    {
        colName: 'validator',
        headerText: 'Validator',
        columnTemplate: 'accountTemplate',
        fields: {
            name: 'valName',
            img: 'valImg',
            pk: 'pk',
            noRedirect: true,
        },
    },
    {
        colName: 'stake',
        columnTemplate: 'amount',
        headerText: 'Stake',
        fields: {
            value: 'stake',
            additionValue: 'protocol',
        },
        sortBy: SORT_BY.STAKE,
    },
    {
        colName: 'score',
        columnTemplate: 'string',
        headerText: 'Score',
        fields: {
            value: 'score',
            postfix: '%',
        },
        sortBy: SORT_BY.SCORE,
    },
    {
        colName: 'uptimeBySnark',
        columnTemplate: 'string',
        fields: {
            value: 'uptimePercent',
            postfix: '%',
        },
        headerText: 'Uptime by Snark',
    },
    {
        colName: 'votedMIPs',
        columnTemplate: 'string',
        fields: {
            value: 'votedMIPs',
        },
        headerText: '% Voted MIPs',
    },
    {
        colName: 'win_Rate',
        columnTemplate: 'string',
        fields: {
            value: 'winRateAvg',
            postfix: '%',
        },
        headerText: 'Win Rate',
    },
];

export const testWorldConfig: TableConfig[] = [
    {
        colName: 'stake',
        headerText: 'Validator',
        columnTemplate: 'accountTemplate',
        fields: {
            name: 'name',
            img: 'img',
            pk: 'pk',
            noRedirect: true,
        },
    },
    {
        colName: 'stake',
        columnTemplate: 'amount',
        headerText: 'Stake',
        fields: {
            value: 'amountStaked',
            additionValue: 'protocol',
        },
        sortBy: SORT_BY.STAKE,
    },
    {
        colName: 'score',
        columnTemplate: 'string',
        headerText: 'Score',
        fields: {
            value: 'emptyValue',
        },
        sortBy: SORT_BY.SCORE,
    },
    {
        colName: 'uptimeBySnark',
        columnTemplate: 'string',
        fields: {
            value: 'emptyValue',
        },
        headerText: 'Uptime by Snark',
    },
    {
        colName: 'votedMIPs',
        columnTemplate: 'string',
        fields: {
            value: 'emptyValue',
        },
        headerText: '% Voted MIPs',
    },
    {
        colName: 'win_Rate',
        columnTemplate: 'string',
        fields: {
            value: 'emptyValue',
        },
        headerText: 'Win Rate',
    },
];
