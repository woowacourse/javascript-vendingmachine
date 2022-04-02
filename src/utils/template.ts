// 봉인
interface inputTemplateProps {
  label: string;
  id: string;
  type: 'text' | 'number';
  placeholder: string;
}

export const InputTemplate = ({ label, id, type, placeholder }: inputTemplateProps) => {
  return `
    <label for=${id}>${label}</label>
    <input id=${id} type=${type} placeholder=${placeholder} required /> 
  `;
};
