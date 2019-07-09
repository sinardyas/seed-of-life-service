const XLSX = require('xlsx');
const Excel = require('exceljs');

const { sheet_to_json: SheetToJSON } = require('xlsx').utils;

const convertExcelToJSON = (data, sheetName) => {
  try {
    const Workbook = XLSX.read(data, { cellDates: true });

    return SheetToJSON(Workbook.Sheets[sheetName]);
  } catch (e) {
    throw e;
  }
};

const readExcelFile = async (data, sheetName) => {
  try {
    const WorkBook = new Excel.Workbook();
    const WorkBookData = await WorkBook.xlsx.load(data);
    const WorkSheetData = WorkBookData.getWorksheet(sheetName);

    let i = 1;
    WorkSheetData.eachRow((row) => {
      console.log(`${i}${row.values}`);

      i += 1;
    });

    return WorkSheetData;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  convertExcelToJSON,
  readExcelFile
};
