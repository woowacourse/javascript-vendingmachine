import snackbar from '../utils/snackbar';

const throwableFunctionHandler = (task: Function) => {
  try {
    snackbar.push(task());
    return true;
  } catch (error) {
    snackbar.push(error);
    return false;
  }
};

export default throwableFunctionHandler;
