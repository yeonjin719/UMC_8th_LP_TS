interface Source {
    headers?: {
        get: (name: string) => string | null;
    };
}

const validType = function (source: Source): boolean {
    const contentType = source?.headers?.get('Content-Type');
    return contentType?.includes('image') ? true : false;
};

export const checkThumbnail = async (thumbnailUrl: string) => {
    try {
        const response = await fetch(thumbnailUrl, { method: 'HEAD' }); // 'HEAD' 요청으로 content-type만 가져옴
        if (validType(response)) {
            return true;
        } else {
            return false; // 이미지가 아닐 경우 default 이미지로 설정
        }
    } catch {
        return false;
    }
};
