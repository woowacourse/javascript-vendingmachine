import snackbar from '../utils/snackbar';

const throwableFunctionHandler = async (task: Function) => {
  try {
    snackbar.push(await task());
    return true;
  } catch (error) {
    snackbar.push(error);
    return false;
  }
};

export default throwableFunctionHandler;
