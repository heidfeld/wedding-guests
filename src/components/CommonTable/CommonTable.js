import React, {useMemo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useTable, useBlockLayout} from 'react-table';
import {useSticky} from 'react-table-sticky';

import EditableCell from './EditableCell';
import './less/CommonTable.less';

const CommonTable = (props) => {

    const {columns, data, onValueChanged, hiddenColumns, editableColumns} = props;

    const isEditable = () => {
        return typeof onValueChanged === 'function' && editableColumns.length;
    };

    const handleValueChanged = (row, column, value) => {
        if (isEditable()) {
            onValueChanged(row, column, value);
        }
    };

    const getTableInitialState = () => {
        return {
            hiddenColumns
        }
    };

    const tableColumns = useMemo(() => {
        return columns.map(col => {
            const columnCopy = {...col};
            const {accessor: columnId} = columnCopy;
            if (editableColumns.includes(columnId)) {
                columnCopy.Cell = EditableCell;
            }
            return columnCopy;
        });
    }, [columns]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
            columns: tableColumns,
            data,
            initialState: getTableInitialState(),
            onValueChanged: handleValueChanged
        },
        useBlockLayout,
        useSticky
    );

    return (
        <table className={'commonTable'} {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} className={'tableRow'}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )

};

CommonTable.defaultProps = {
    hiddenColumns: [],
    editableColumns: []
};

CommonTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        Header: PropTypes.string.isRequired,
        accessor: PropTypes.string.isRequired
    })).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onValueChanged: PropTypes.func,
    hiddenColumns: PropTypes.arrayOf(PropTypes.string),
    editableColumns: PropTypes.arrayOf(PropTypes.string)
};

export default CommonTable;
