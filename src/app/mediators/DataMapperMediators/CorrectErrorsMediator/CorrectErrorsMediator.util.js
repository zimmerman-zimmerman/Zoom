import findIndex from 'lodash/findIndex';

// so here we need to form the errorCell array for the current cells/data
// that is shown in the table, we'll use the actual data
// get the row indexes that are shown in the UI
export function formatErrorCells(
  errorData,
  columnHeaders,
  data,
  replacedColumn = null
) {
  const errorCells = [];

  Object.keys(errorData).forEach(key => {
    let row = parseInt(key.substring(0, key.indexOf('|')), 10);

    const columnName = key.substring(key.indexOf('|') + 1);

    // so we check the first data entry to get the
    // column number according to the column name
    // and this can work only with the first, cause everyt data
    // entry has all the columns listed(at least should have)
    // we also do +3 because we have two extra columns that we
    // show in the table then there are columns in the file
    // and extra one because yet again the column data starts from 0
    // and in ui it starts from 1
    const colIndex = columnHeaders.indexOf(columnName) + 3;

    row = findIndex(data, ['line no.', row]) + 1;

    // so we also skip generating error cell data for replaced values
    // as they are already replaced, but we get the error data from
    // before they were replaced
    if (row !== 0 && replacedColumn !== columnName) {
      errorCells.push({
        row,
        col: colIndex,
        message: errorData[key]
      });
    }
  });

  return errorCells;
}