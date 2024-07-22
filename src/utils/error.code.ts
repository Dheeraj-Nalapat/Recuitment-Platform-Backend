export const ErrorCodes: { [key: string]: CustomError } = {
  EMPLOYEE_WITH_ID_NOT_FOUND: {
    CODE: "EMPLOYEE_WITH_ID_NOT_FOUND",
    MESSAGE: "Emplpoyee with given id not found",
  },
  VALIDATION_ERROR: {
    CODE: "VALIDATION_ERROR",
    MESSAGE: "Error while validation request body",
  },
  INCORRECT_PASSWORD: {
    CODE: "INCORRECT_PASSWORD",
    MESSAGE: "Incorrect password",
  },
  UNAUTHORIZED: {
    CODE: "UNAUTHORIZED",
    MESSAGE: "You are not authorized to perform this action",
  },
  DELETION_CONSTRAINT_ERROR: {
    CODE: "DELETION_CONSTRAINT_ERROR",
    MESSAGE:
      "cannot delete this resource as it is referenced by another resource",
  },
  REFERRAL_WITH_ID_NOT_FOUND: {
    CODE: "REFERRAL_WITH_ID_NOT_FOUND",
    MESSAGE: "Referral with given ID not found",
  },
  POSITION_WITH_ID_NOT_FOUND: {
    CODE: "POSITION_WITH_ID_NOT_FOUND",
    MESSAGE: "Position with given ID not found",
  },
  JOBOPENING_WITH_ID_NOT_FOUND: {
    CODE: "JOBOPENING_WITH_ID_NOT_FOUND",
    MESSAGE: "Job Opening with the given ID not found",
  },
  CANDIDATE_NOT_FOUND: {
    CODE: "CANDIDATE_NOT_FOUND",
    MESSAGE: "Candidate not found, please enter candidate details",
  },
};

export interface CustomError {
  CODE: string;
  MESSAGE: string;
}
