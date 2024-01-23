import { TableTemplates } from '../../components/molecules/table/templates';
import { SORT_BY, TableConfig } from '../types';

export const ScoringConfig: TableConfig[] = [
    {
        colName: 'validator',
        headerText: 'Validator',
        columnTemplate: TableTemplates.ACCOUNT_TEMPLATE,
        fields: {
            name: 'valName',
            img: 'valImg',
            pk: 'pk',
            noRedirect: true,
        },
        view: {
            sm: 8,
            md: 14,
            lg: 14,
        },
    },
    {
        colName: 'stake',
        columnTemplate: TableTemplates.AMOUNT,
        headerText: 'Stake',
        fields: {
            value: 'stake',
            additionValue: 'protocol',
        },
        sortBy: SORT_BY.STAKE,
    },
    {
        colName: 'score',
        columnTemplate: TableTemplates.STRING,
        headerText: 'Score',
        fields: {
            value: 'score',
            postfix: '%',
        },
        sortBy: SORT_BY.SCORE,
    },
    {
        colName: 'uptimeBySnark',
        columnTemplate: TableTemplates.STRING,
        fields: {
            value: 'uptimePercent',
            postfix: '%',
        },
        headerText: 'Uptime by Snark',
    },
    {
        colName: 'votedMIPs',
        columnTemplate: TableTemplates.STRING,
        fields: {
            value: 'votedMIPs',
        },
        headerText: '% Voted MIPs',
    },
    {
        colName: 'win_Rate',
        columnTemplate: TableTemplates.STRING,
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
        columnTemplate: TableTemplates.ACCOUNT_TEMPLATE,
        fields: {
            name: 'name',
            img: 'img',
            pk: 'pk',
            noRedirect: true,
        },
        view: {
            sm: 4,
            md: 8,
            lg: 12,
        },
    },
    {
        colName: 'stake',
        columnTemplate: TableTemplates.AMOUNT,
        headerText: 'Stake',
        fields: {
            value: 'amountStaked',
            additionValue: 'protocol',
        },
        sortBy: SORT_BY.STAKE,
    },
    {
        colName: 'score',
        columnTemplate: TableTemplates.STRING,
        headerText: 'Score',
        fields: {
            value: 'emptyValue',
        },
        sortBy: SORT_BY.SCORE,
    },
    {
        colName: 'uptimeBySnark',
        columnTemplate: TableTemplates.STRING,
        fields: {
            value: 'emptyValue',
        },
        headerText: 'Uptime by Snark',
    },
    {
        colName: 'votedMIPs',
        columnTemplate: TableTemplates.STRING,
        fields: {
            value: 'emptyValue',
        },
        headerText: '% Voted MIPs',
    },
    {
        colName: 'win_Rate',
        columnTemplate: TableTemplates.STRING,
        fields: {
            value: 'emptyValue',
        },
        headerText: 'Win Rate',
    },
];
