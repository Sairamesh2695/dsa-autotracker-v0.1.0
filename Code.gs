function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Request body is missing");
    }

    const data = JSON.parse(e.postData.contents);

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    if (!spreadsheet) {
      throw new Error("Could not find active spreadsheet");
    }

    const sheet = spreadsheet.getActiveSheet();

    if (!sheet) {
      throw new Error("Could not find active sheet");
    }

    const rowNumber = sheet.getLastRow();

    sheet.appendRow([
      rowNumber,
      data.title,
      data.platform,
      data.status,
      data.questionLink,
      data.intuition,
      data.topicsValue,
      data.lastRevised,
      data.nextRevision
    ]);

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: true,
          message: "Row inserted",
          sheet: sheet.getName(),
          row: rowNumber,
          title: data.title
        })
      )
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          error: error.toString()
        })
      )
      .setMimeType(ContentService.MimeType.JSON);
  }
}
