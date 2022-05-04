const fs = require("fs");
const PDFDocument = require("pdf-lib").PDFDocument;
// import { fromPath } from "pdf2pic";
const { fromPath } = require("pdf2pic");

async function writePdfBytesToFile(fileName, pdfBytes) {
  return fs.promises.writeFile(fileName, pdfBytes);
}

module.exports.splitPDF = async function splitPDF(req, res) {
  try {
    let pathToPdf =
      "D:/Sem 3-2/Video Lecture Transcription/Project Main/Backend/routes/slides/InputSlides.pdf";
    const docmentAsBytes = await fs.promises.readFile(pathToPdf);

    // Load your PDFDocument
    const pdfDoc = await PDFDocument.load(docmentAsBytes);

    const numberOfPages = pdfDoc.getPages().length;

    for (let i = 0; i < numberOfPages; i++) {
      // Create a new "sub" document
      const subDocument = await PDFDocument.create();
      // copy the page at current index
      const [copiedPage] = await subDocument.copyPages(pdfDoc, [i]);
      subDocument.addPage(copiedPage);
      const pdfBytes = await subDocument.save();
      await writePdfBytesToFile(
        `D:/Sem 3-2/Video Lecture Transcription/Project Main/Backend/routes/splitSlides/Slide-${
          i + 1
        }.pdf`,
        pdfBytes
      );
    }
    res.json({
      ok: true,
      message: `${numberOfPages} slides successfully splitted `,
    });
  } catch (error) {
    res.json({
      ok: false,
      error: error,
    });
  }
};

module.exports.toPNG = async function toPNG(req, res) {
  try {
    const options = {
      density: 100,
      saveFilename: "untitled",
      savePath: "./images",
      format: "png",
      width: 600,
      height: 600,
    };
    const storeAsImage = fromPath(
      `D:/Sem 3-2/Video Lecture Transcription/Project Main/Backend/routes/slides/InputSlides.pdf`,
      options
    );
    const pageToConvertAsImage = 1;

    storeAsImage(pageToConvertAsImage).then((resolve) => {
      console.log("Page 1 is now converted as image");
      res.json({
        ok: true,
        message: `Converted`,
      });
      return resolve;
    });
  } catch (error) {
    res.json({
      ok: false,
      error: error,
    });
  }
};
