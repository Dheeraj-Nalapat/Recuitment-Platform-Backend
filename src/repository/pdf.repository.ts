import { Repository } from "typeorm";
import { PdfDetails } from "../entity/pdf.entity";

class PdfRepository {
  constructor(private repository: Repository<PdfDetails>) {}

  save = async (pdfDetails: PdfDetails): Promise<PdfDetails> => {
    return this.repository.save(pdfDetails);
  };

  findOneBy = async (id: number): Promise<PdfDetails | undefined> => {
    return this.repository.findOneBy({ id });
  };
}

export default PdfRepository;
