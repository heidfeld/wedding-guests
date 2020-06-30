import {isChair, isTable} from "./TypeConstants";

export const getAllTables = (data) => {
    return Object.values(data).filter(({type}) => isTable(type));
};

export const getAllChairs = (data, parentId) => {
    if (parentId) {
        return Object.values(data).filter(({parent, type}) => parent && parent === parentId && isChair(type));
    }
    return Object.values(data).filter(({type}) => isChair(type));
};