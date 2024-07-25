import PdfController from "../controller/pdf.controller";
import dataSource from "../db/data-source.db";
import { PdfDetails } from "../entity/pdf.entity";
import PdfRepository from "../repository/pdf.repository";
import PdfService from "../service/pdf.service";

const pdfController = new PdfController(
  new PdfService(new PdfRepository(dataSource.getRepository(PdfDetails)))
);

const pdfRouter = pdfController.router;
export default pdfRouter;
