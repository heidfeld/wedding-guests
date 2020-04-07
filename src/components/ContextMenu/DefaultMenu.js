import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from "react-tooltip";

import ControlChooser from '../ControlChooser/ControlChooser';
import './less/DefaultMenu.less';
import Control from "../Control/Control";
import {TYPES} from "../WeddingGuests/TypeConstants";

const DefaultMenu = (props) => {

    const {t, onAdd, exportPDF, exportPNG, exportSVG} = props;

    const handleRoundTableAdd = (evt) => {
        onAdd(evt, {type: TYPES.ROUND_TABLE});
    };

    const handleRectTableAdd = (evt) => {
        onAdd(evt, {type: TYPES.RECT_TABLE});
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

    const renderAddRoundTable = () => {
        return <Control
            key={'control_addTable'}
            tooltipSide={'right'}
            tooltip={t('buttons.addRoundTable')}
            className={'btn btn-primary'}
            callback={handleRoundTableAdd}
            icon={'fa fa-circle-o'}
        />;
    };

    const renderAddRectTable = () => {
        return <Control
            key={'control_addTable'}
            tooltipSide={'right'}
            tooltip={t('buttons.addRectTable')}
            className={'btn btn-primary'}
            callback={handleRectTableAdd}
            icon={'fa fa-square-o'}
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
            {renderMenuItem(renderAddRoundTable())}
            {renderMenuItem(renderAddRectTable())}
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