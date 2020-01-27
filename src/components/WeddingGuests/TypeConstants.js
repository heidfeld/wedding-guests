export const TYPES = {
    ROUND_TABLE: 'RoundTable',
    TABLE: 'Table',
    ROUND_CHAIR: 'RoundChair',
    CHAIR: 'Chair'
};

export const TABLE_SIZE = {
    RADIUS_LARGE: 100,
    RADIUS_MEDIUM: 75,
    RADIUS_SMALL: 50
};

export const isTable = (type) => {
    return type === TYPES.ROUND_TABLE || type === TYPES.TABLE;
};

export const isChair = (type) => {
    return type === TYPES.ROUND_CHAIR || type === TYPES.CHAIR;
};
