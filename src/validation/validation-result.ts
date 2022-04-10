class ValidationResult {
  constructor(public pass: boolean, public errorMessage = '') {
    this.pass = pass;
    this.errorMessage = errorMessage;
  }
}

export default ValidationResult;
