import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from "react-tooltip";

import ControlChooser from '../ControlChooser/ControlChooser';
import './less/DefaultMenu.less';
import Control from "../Control/Control";

const DefaultMenu = (props) => {

    const {t, onAdd, exportPDF, exportPNG, exportSVG} = props;

    const handleAdd = (evt) => {
        onAdd(evt);
    };

    const renderExportPreview = () => {
        return (
            <Control
                key={'export_preview'}
                tooltipSide={'right'}
                tooltip={t('buttons.export')}
                className={'btn btn-success'}
                icon={'fa fa-download'}
            />
        );
    };

    const renderExportPDF = () => {
        return <Control
            key={'control_export_PDF'}
            tooltipSide={'right'}
            tooltip={t('buttons.exportPDF')}
            className={'btn btn-primary'}
            callback={exportPDF}
            icon={'fa fa-file-pdf-o'}
        />;
    };

    const renderExportPNG = () => {
        return <Control
            key={'control_export_PNG'}
            tooltipSide={'right'}
            tooltip={t('buttons.exportPNG')}
            className={'btn btn-primary'}
            callback={exportPNG}
            icon={'fa fa-file-image-o'}
        />;
    };

    const renderExportSVG = () => {
        return <Control
            key={'control_export_SVG'}
            tooltipSide={'right'}
            tooltip={t('buttons.exportSVG')}
            className={'btn btn-primary'}
            callback={exportSVG}
            icon={'fa fa-file-code-o'}
        />;
    };

    const renderAddTable = () => {
        return <Control
            key={'control_addTable'}
            tooltipSide={'right'}
            tooltip={t('buttons.addTable')}
            className={'btn btn-primary'}
            callback={handleAdd}
            icon={'fa fa-plus'}
        />;
    };

    const renderExportList = () => {
        return ([
            renderExportPDF(),
            renderExportPNG(),
            renderExportSVG()
        ]);
    };

    const renderMenuItem = (control) => {
        return (
            <div className={'menuItem'}>
                {control}
            </div>
        );
    };

    const renderExportChooser = () => {
        return <ControlChooser vertical={true} preview={renderExportPreview()}>
            {renderExportList()}
        </ControlChooser>;
    };

    return (
        <div className='DefaultMenu'>
            <ReactTooltip/>
            {renderMenuItem(renderAddTable())}
            {renderMenuItem(renderExportChooser())}
            <div className={'clear'}/>
        </div>
    );

};


DefaultMenu.propTypes = {
    onAdd: PropTypes.func.isRequired,
    exportSVG: PropTypes.func.isRequired,
    exportPNG: PropTypes.func.isRequired,
    exportPDF: PropTypes.func.isRequired
};

export default DefaultMenu;