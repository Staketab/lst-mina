import { SORT_BY, TableConfig } from '../types';

export const ScoringConfig: TableConfig[] = [
    {
        colName: 'stake',
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
        },
        sortBy: SORT_BY.SCORE,
    },
    {
        colName: 'uptimeBySnark',
        columnTemplate: 'string',
        fields: {
            value: 'uptimePercent',
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
        },
        headerText: 'Win Rate',
    },
];
