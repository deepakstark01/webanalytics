import * as XLSX from 'xlsx';

const generateAndDownloadExcel = (columns, data, filename) => {
  const excelData = [];

  // Add header row
  const headerRow = columns.map(column => column.title);
  excelData.push(headerRow);

  // Add data rows
  data.forEach(item => {
    const rowData = columns.map(column => {
      if (Array.isArray(column.dataIndex)) {
        // Handle nested data (e.g., ["Address", "City"])
        const nestedValue = column.dataIndex.reduce((obj, key) => (obj && obj[key]) || '', item);
        return nestedValue && typeof nestedValue === 'string' ? nestedValue : '';
      } else {
        // Handle simple data properties
        return item[column.dataIndex] || '';
      }
    });
    excelData.push(rowData);
  });

  const worksheet = XLSX.utils.aoa_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, filename);
};

export default generateAndDownloadExcel;
