export interface FormStructure {
  formInfo: FormInfo;
  fields: Field[];
  services?: FormServices;
}

export interface FormInfo {
  title: string;
}

export interface FormServices {
  dataService: string;
}

export interface Field {
  type: string;
  key: string;
  label: string;
  placeholder: string;
  validation?: FieldValidation;
  options?: string[];
  validationDependencies?: ValidationDependency[];
  visibilityDependencies?: VisibilityDependency[];
  fields?: Field[];
}

export interface FieldValidation {
  required: boolean;
  regex: string;
  minLength: number;
  maxLength: number;
}

export interface ValidationDependency {
  field: string;
  value: string;
  validation: FieldValidation;
}

export interface VisibilityDependency {
  field: string;
  value: string;
}