import { upload } from "../config/multerConfig";
import PdfService from "../service/pdf.service";
import express from "express";

class PdfController {
  public router: express.Router;
  constructor(private pdfService: PdfService) {
    this.router = express.Router();

    this.router.post("/", upload.single("pdf"), this.uploadPdf);
    this.router.get("/:id", this.getPdf);
  }

  public uploadPdf = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      const { filename, originalname, path, size } = req.file;
      const pdfInfo = await this.pdfService.savePdfInfo(
        filename,
        originalname,
        path,
        size
      );
      res.status(201).send(pdfInfo);
    } catch (err) {
      res.status(500).json({ error: "Error uploading file" });
    }
  };

  public getPdf = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const id = Number(req.params.id);

    try {
      const pdfInfo = await this.pdfService.getPdfInfo(id);
      if (!pdfInfo) {
        return res.status(404).json({ error: "File not Found" });
      }
      res.status(200).send(pdfInfo);
    } catch (err) {
      res.status(500).json({ error: "Error retrieving PDF" });
    }
  };
}

export default PdfController;
