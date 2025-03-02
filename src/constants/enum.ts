export enum TSearchEnum {
    TITLE = 'title',
    TAG = 'tag',
}

export enum TOrder {
    OLDEST_FIRST = 'asc',
    NEWEST_FIRST = 'desc',
}

export const TOrderLabel: Record<TOrder, string> = {
    [TOrder.OLDEST_FIRST]: '오래된순',
    [TOrder.NEWEST_FIRST]: '최신순',
};
