export const TYPES = {
    ROUND_TABLE: 'RoundTable',
    RECT_TABLE: 'RectTable',
    ROUND_CHAIR: 'RoundChair',
    CHAIR: 'Chair'
};

export const TABLE_SIZE = {
    RADIUS_LARGE: 100,
    RADIUS_MEDIUM: 75,
    RADIUS_SMALL: 50
};

export const isRoundTable = (type) => type === TYPES.ROUND_TABLE;

export const isRectTable = (type) => type === TYPES.RECT_TABLE;

export const isTable = (type) => {
    return isRoundTable(type) || isRectTable(type);
};

export const isChair = (type) => {
    return type === TYPES.ROUND_CHAIR || type === TYPES.CHAIR;
};
