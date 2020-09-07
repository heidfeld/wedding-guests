import {isChair, isTable} from "./TypeConstants";

/**
 * Gets all tables data
 * @param {{}} data - Input data
 * @returns {[*]} - Returns array with all tables. If data doesn't contain any table, empty array will be returned.
 */
export const getAllTables = (data) => {
    return Object.values(data).filter(({type}) => isTable(type));
};

/**
 * Gets all chairs data associated with parent
 * @param {{}} data - Input data
 * @param {string} parentId - Parent id
 * @returns {[*]} - Returns array with all chairs associated with parent. If data doesn't contain any chair associated
 * with parent, empty array will be returned.
 */
export const getAllChairs = (data, parentId) => {
    if (parentId) {
        return Object.values(data).filter(({parent, type}) => parent && parent === parentId && isChair(type));
    }
    return Object.values(data).filter(({type}) => isChair(type));
};

/**
 * Gets selected entities based on array with selected keys and provided data structure
 * @param {Array<string>} selectedObjects - Array with selected object keys
 * @param {{}} data - Component data structure
 * @returns {Array<*>} - Selected entities based on given data structure
 */
export const getSelectedEntities = (selectedObjects = [], data = {}) => {
    return selectedObjects.map(selectedKey => data[selectedKey]).filter(entity => entity);
};

/**
 * Verifies if selected is only one object
 * @param {Array<string>} selectedObjects - Array with selected object keys
 * @returns {boolean} - Returns true if single object is selected, false otherwise
 */
export const isSingleSelection = (selectedObjects) => {
    return selectedObjects?.length === 1
};
