class ValidationResult {
  constructor(public hasError: boolean, public errorMessage = '') {
    this.hasError = hasError;
    this.errorMessage = errorMessage;
  }
}

export default ValidationResult;
