import {isChair, isTable} from "../WeddingGuests/TypeConstants";

export const getAllTables = (data) => {
    return Object.values(data).filter(({type}) => isTable(type));
};

export const getAllChairs = (data, parentId) => {
    return Object.values(data).filter(({parent, type}) => parent && parent === parentId && isChair(type));
};