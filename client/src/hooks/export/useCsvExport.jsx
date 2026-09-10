import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const useCsvExport =
    () =>
    ({ data, fileName }) => {
        const worksheet = XLSX.utils.json_to_sheet(data);

        const csv = XLSX.utils.sheet_to_csv(worksheet);

        const blob = new Blob([csv], {
            type: 'text/csv;charset=utf-8;',
        });

        saveAs(blob, `${fileName}.csv`);
    };

export default useCsvExport;
