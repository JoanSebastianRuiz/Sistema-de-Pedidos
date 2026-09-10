import { useTheme } from '@emotion/react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import useLang from '../i18n/useLang';

import logo from '/static/img/logo/logo.png';

const sanitizeFileName = (name) => name.replace(/[/\\:*?"<>|]/g, '_');

const usePdfExport = () => {
    const { t } = useLang();
    const theme = useTheme();

    return ({ apiRef, columns, rows, fileName }) => {
        try {
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4',
            });

            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const primaryColor = theme.palette.primary.main;

            const logoWidth = 40;
            const logoHeight = 12;
            const headerHeight = 30;

            const totalGridWidth = columns.reduce(
                (sum, col) => sum + (col.width ?? col.flex ?? 1),
                0
            );

            const tableWidth = pageWidth - 20;

            const columnStyles = Object.fromEntries(
                columns.map((col, i) => {
                    const ratio = (col.width ?? col.flex ?? 1) / totalGridWidth;

                    return [
                        i,
                        {
                            cellWidth: parseFloat((tableWidth * ratio).toFixed(2)),
                        },
                    ];
                })
            );

            const body = rows.map((row) =>
                columns.map((column) => {
                    try {
                        const params = apiRef.current.getCellParams(row.id, column.field);

                        return String(params.formattedValue ?? params.value ?? '');
                    } catch {
                        return '';
                    }
                })
            );

            const titleLines = doc.splitTextToSize(fileName, pageWidth - logoWidth - 45);

            const renderHeader = (extraY = 0) => {
                const currentHeaderHeight = headerHeight + extraY;

                doc.addImage(logo, 'PNG', pageWidth - logoWidth - 14, 9, logoWidth, logoHeight);

                doc.setFontSize(18);
                doc.setTextColor(primaryColor);
                doc.text(titleLines, 14, 14);

                doc.setFontSize(9);
                doc.setTextColor(120, 120, 120);
                doc.text(`${t('generated')}: ${new Date().toLocaleString()}`, 14, 21 + extraY);

                doc.setDrawColor(primaryColor);
                doc.setLineWidth(0.5);
                doc.line(14, currentHeaderHeight, pageWidth - 14, currentHeaderHeight);

                return currentHeaderHeight;
            };

            let currentHeaderHeight = headerHeight;

            if (titleLines.length > 1) {
                currentHeaderHeight = headerHeight + (titleLines.length - 1) * 7;
            }

            renderHeader(currentHeaderHeight - headerHeight);

            autoTable(doc, {
                startY: currentHeaderHeight + 4,
                head: [columns.map((column) => column.headerName)],
                body,
                columnStyles,
                styles: {
                    fontSize: 8,
                    cellPadding: 3,
                    overflow: 'linebreak',
                    valign: 'middle',
                },
                headStyles: {
                    fillColor: primaryColor,
                    textColor: 255,
                    fontStyle: 'bold',
                },
                alternateRowStyles: {
                    fillColor: [245, 245, 245],
                },
                margin: {
                    top: currentHeaderHeight + 4,
                    left: 10,
                    right: 10,
                },
            });

            // Footer
            const pageCount = doc.internal.getNumberOfPages();

            for (let page = 1; page <= pageCount; page++) {
                doc.setPage(page);

                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);

                doc.text(fileName, 14, pageHeight - 8);

                doc.text(
                    t('countOfPages', {
                        current: page,
                        total: pageCount,
                    }),
                    pageWidth - 35,
                    pageHeight - 8
                );
            }

            doc.save(`${sanitizeFileName(fileName)}.pdf`);
        } catch (error) {
            throw error;
        }
    };
};

export default usePdfExport;
