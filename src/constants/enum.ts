export enum TSearchEnum {
    TITLE = 'title',
    TAG = 'tag',
}

export const TSearchLabel: Record<TSearchEnum, string> = {
    [TSearchEnum.TITLE]: '제목',
    [TSearchEnum.TAG]: '태그',
};

export enum TOrder {
    OLDEST_FIRST = 'asc',
    NEWEST_FIRST = 'desc',
}

export const TOrderLabel: Record<TOrder, string> = {
    [TOrder.OLDEST_FIRST]: '오래된순',
    [TOrder.NEWEST_FIRST]: '최신순',
};
