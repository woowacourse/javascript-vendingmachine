export default function selectDom(selector, baseElement = document) {
  return baseElement.querySelector(selector);
}
