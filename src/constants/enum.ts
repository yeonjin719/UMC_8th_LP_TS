export enum TSearchEnum {
    TITLE = 'title',
    TAG = 'tag',
}

export enum TOrder {
    OLDEST_FIRST = 'asc',
    NEWEST_FIRST = 'desc',
}

// 한글 매핑 객체 (UI에서 사용)
export const TOrderLabel: Record<TOrder, string> = {
    [TOrder.OLDEST_FIRST]: '오래된순',
    [TOrder.NEWEST_FIRST]: '최신순',
};
