import { TableConfig } from '../types';

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
        columnTemplate: 'string',
        headerText: 'Stake',
        fields: {
            value: 'stake',
            additionValue: 'protocol',
        },
    },
    {
        colName: 'score',
        columnTemplate: 'string',
        headerText: 'Score',
        fields: {
            value: 'score',
            postfix: '%',
        },
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
