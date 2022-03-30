export function pushHistoryPath(path) {
  history.pushState({ path }, '', path);
}
