export type FieldType = 'text' | 'number' | 'email' | 'textarea';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
}

export interface FormConfig {
  id: string;
  title: string;
  fields: FormField[];
}