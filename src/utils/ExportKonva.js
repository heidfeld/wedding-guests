import {saveAs} from 'file-saver';
import pdfmake from 'pdfmake/build/pdfmake';
import 'pdfmake/build/vfs_fonts';
import SVGCreator from './SVGCreator';
import {getDataBlob, getGraphExportData, getFileName} from './KonvaHelpers';

const PDF_MARGIN = 20;

export const exportPNG = (stage, maxZoom, fileName) => {
    const {data} = getGraphExportData(stage, maxZoom);
    //remove data:mime-type and whitespace for IE compatibility
    const pngData = data.replace('data:image/png;base64,', '').replace(/\s/g, '');
    const blob = getDataBlob(pngData);
    saveAs(blob, getFileName(fileName, 'png'));
};

export const exportSVG = (stage, fileName) => {
    const svg = SVGCreator.createFromStage(stage);
    const blob = new Blob([svg], {type: 'image/svg+xml;charset=utf-8'});
    saveAs(blob, getFileName(fileName, 'svg'));
};

export const exportPDF = (stage, maxZoom, fileName) => {
    const {data, width, height} = getGraphExportData(stage, maxZoom);
    const sizeOrientation = width > height ? 'landscape' : 'portrait';
    pdfmake.createPdf({
        pageSize: {
            width: width + (2 * PDF_MARGIN),
            height: height + (2 * PDF_MARGIN)
        },
        pageOrientation: sizeOrientation,
        pageMargins: [PDF_MARGIN, PDF_MARGIN],
        content: [
            {
                image: data
            }
        ]
    }).download(getFileName(null, 'pdf'));
};
