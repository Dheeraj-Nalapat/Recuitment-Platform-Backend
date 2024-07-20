import ReferalRepository from "../repository/referal.repository";

class ReferalService {
  constructor(private referalRepository: ReferalRepository) {}

  getAllReferal = async () => {
    return this.referalRepository.find();
  };

  getAllReferalById = async (id: number) => {
    return this.referalRepository.findOneBy({ id });
  };

  getAllReferalByEmployee = async (id: number) => {};

  getAllReferalByCandidate = async () => {};

  getAllReferalByJobOpening = async () => {};

  createReferal = async () => {};

  updateReferal = async () => {};

  deleteReferal = async () => {};
}
