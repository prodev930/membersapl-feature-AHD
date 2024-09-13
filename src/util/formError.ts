export const REQUIRED_ERROR = 'この項目は必須です';
export const maxLengthString = (length: number, label?: string) =>
  `${label ? `${label}は` : ''}${length}文字以内で入力してください`;
export const minLengthString = (length: number, label?: string) =>
  `${label ? `${label}は` : ''}${length}文字以上で入力してください`;
export const nonNumberString = (label: string) =>
  `${label}には数字以外を入力してください`;
