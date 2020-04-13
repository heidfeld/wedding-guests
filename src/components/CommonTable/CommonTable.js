import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {useBlockLayout, useTable, useFilters} from 'react-table';
import {useSticky} from 'react-table-sticky';

import EditableCell from './EditableCell';
import './less/CommonTable.less';
import TextInput from '../CommonInputFactory/TextInput';

const CommonTable = (props) => {

    const {columns, data, onValueChanged, hiddenColumns, editableColumns, filterable} = props;

    const isFilterable = () => {
        return filterable;
    };

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

    const defaultColumnFilter = ({column: {filterValue, setFilter, Header}}) => {
        return (
            <TextInput
                value={filterValue || ''}
                onChange={({target}) => {
                    setFilter(target.value || undefined)
                }}
                placeholder={Header.toString()}
            />
        )
    };

    const defaultColumn = React.useMemo(
        () => ({
            Filter: defaultColumnFilter,
        }),
        []
    );

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

    const getFilterLogic = () => {
        if (isFilterable()) {
            return useFilters;
        }
    };

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
            onValueChanged: handleValueChanged,
            defaultColumn
        },
        getFilterLogic(),
        useBlockLayout,
        useSticky
    );

    return (
        <table className={'commonTable'} {...getTableProps()}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>
                            <div>{column.canFilter ? column.render('Filter') : column.render('Header')}</div>
                        </th>
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
    editableColumns: [],
    filterable: false
};

CommonTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        Header: PropTypes.string.isRequired,
        accessor: PropTypes.string.isRequired
    })).isRequired,
    data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    onValueChanged: PropTypes.func,
    hiddenColumns: PropTypes.arrayOf(PropTypes.string),
    editableColumns: PropTypes.arrayOf(PropTypes.string),
    filterable: PropTypes.bool
};

export default CommonTable;
