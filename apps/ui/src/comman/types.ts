export type TableConfig = {
    colName: string;
    columnTemplate: string;
    fields?: {
        value?: string;
        additionValue?: string;
        postfix?: string;
        name?: string;
        img?: string;
        pk?: string;
        getRedirectLink?: (value: string) => string;
        noRedirectFromData?: string;
        noHash?: boolean;
        isCoinTable?: boolean;
        noRedirect?: boolean;
    };
    sortBy?: SORT_BY;
    headerText?: string;
    view?: {
        sm: number;
        md: number;
        lg: number;
    };
    style?: {
        noGrow?: boolean;
        width?: string;
        justifyContent?: string;
        maxWidth?: string;
        minWidth?: string;
    };
};

export type LimitOptions = { text: string; value: number }[];
export type TabSwitcherOptions = string[];

export type DataTable = {
    data?: any[];
    content?: any[];
    size: number;
    totalPages: number;
    pageable: {
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        };
        offset: number;
        pageNumber: number;
        pageSize: number;
        unpaged: boolean;
        paged: boolean;
    };
    last: boolean;
    totalElements: number;
    number: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
};

export enum SORT_BY {
    SCORE = 'score',
    STAKE = 'stake',
}

export enum ORDER_BY {
    DESC = 'DESC',
    ASC = 'ASC',
}
