import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {getAllChairs} from "../WeddingGuests/DataHelper";
import CommonTable from "../../components/CommonTable/CommonTable";

const GuestTable = (props) => {

    const {t, data, updateData} = props;

    const getUpdateProperties = (columnId, value) => {
        const properties = {};
        switch (columnId) {
            case 'headerName': {
                properties.name = value;
                break;
            }
            case 'headerSurname': {
                properties.surname = value;
                break;
            }
            default: {
                break;
            }
        }
        return properties;
    };

    const onValueChanged = (row, column, value) => {
        const {id: columnId} = column;
        const {values: {headerId: entityId} = {}} = row;

        const updateProperties = getUpdateProperties(columnId, value);
        if (entityId && updateProperties) {
            updateData(entityId, updateProperties, false);
        }
    };

    const tableColumns = useMemo(() => {
        return [
            {
                Header: 'id',
                accessor: 'headerId'
            },
            {
                Header: t('guestTable.headers.number'),
                accessor: 'headerNumber',
                width: 60
            },
            {
                Header: t('guestTable.headers.name'),
                accessor: 'headerName'
            },
            {
                Header: t('guestTable.headers.surname'),
                accessor: 'headerSurname'
            },
            {
                Header: t('guestTable.headers.table'),
                accessor: 'headerTable'
            }
        ];
    }, [t]);

    const toRow = (entity, tableData, idx) => {
        const {id, name, surname, parent} = entity;
        const {label: tableName} = tableData[parent] || {};
        return {
            headerNumber: idx + 1,
            headerId: id,
            headerName: name,
            headerSurname: surname,
            headerTable: tableName
        }
    };

    const getEditableColumns = () => {
        return ['headerName', 'headerSurname'];
    };

    const getHiddenColumns = () => {
        return ['headerId'];
    };

    const tableData = useMemo(() => {
        return getAllChairs(data).map((entity, idx) => toRow(entity, data, idx));
    }, [data]);

    return (
        <CommonTable
            columns={tableColumns}
            data={tableData}
            hiddenColumns={getHiddenColumns()}
            onValueChanged={onValueChanged}
            editableColumns={getEditableColumns()}
            filterable={true}
        />
    );

};

GuestTable.propTypes = {
    t: PropTypes.func,
    data: PropTypes.shape().isRequired,
    updateData: PropTypes.func.isRequired
};

export default GuestTable;
