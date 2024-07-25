import { PdfDetails } from "../entity/pdf.entity";
import PdfRepository from "../repository/pdf.repository";

class PdfService {
  constructor(private pdfRepository: PdfRepository) {}

  savePdfInfo = async (
    filename: string,
    originalname: string,
    path: string,
    size: number
  ) => {
    const newPdfDetails = new PdfDetails();
    newPdfDetails.filename = filename;
    newPdfDetails.originalname = originalname;
    newPdfDetails.path = path;
    newPdfDetails.size = size;

    return this.pdfRepository.save(newPdfDetails);
  };

  getPdfInfo = async (id: number) => {
    return this.pdfRepository.findOneBy(id);
  };
}

export default PdfService;
