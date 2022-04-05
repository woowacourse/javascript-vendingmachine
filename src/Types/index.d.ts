declare module '*.html' {
  const content: string;
  export default content;
}

interface TemplateSetting {
  elementProperty: Record<string, string | number | object | []>;
  childTextContent: Record<string, string | number>;
}
