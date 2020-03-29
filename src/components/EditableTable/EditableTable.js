import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import {useTable} from 'react-table';

import {getAllChairs} from "../GeneralStage/DataHelper";
import './less/EditableTable.less';

const EditableTable = (props) => {

    const {t, tableData} = props;

    const columns = useMemo(() => {
        return [
            {
                Header: t('table.headers.name'),
                accessor: 'headerName'
            },
            {
                Header: t('table.headers.surname'),
                accessor: 'headerSurname'
            },
            {
                Header: t('table.headers.table'),
                accessor: 'headerTable'
            }
        ];
    }, [t]);

    const toRow = (entity, tableData) => {
        const {name, surname, parent} = entity;
        const {label: tableName} = tableData[parent] || {};
        return {
            headerName: name,
            headerSurname: surname,
            headerTable: tableName
        }
    };

    const data = useMemo(() => {
        return getAllChairs(tableData).map(entity => toRow(entity, tableData));
    }, [tableData]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });

    return (
        <table {...getTableProps()}>
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
                    <tr {...row.getRowProps()}>
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

EditableTable.propTypes = {
    t: PropTypes.func,
    tableData: PropTypes.shape()
};

export default EditableTable;