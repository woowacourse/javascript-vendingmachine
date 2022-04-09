import { VALIDATION_ERROR_NAME } from '../constatns/validator-constants';

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = VALIDATION_ERROR_NAME;
  }
}

export default ValidationError;
