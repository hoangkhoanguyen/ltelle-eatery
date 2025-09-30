export interface CommonField {
  key: string;
  label: string;
  description: string;
  isAlwaysShow: boolean;
  isRequired: boolean;
}

export interface TextField {
  type: "text";
  placeholder?: string;
}

export interface TextareaField {
  type: "textarea";
  placeholder?: string;
}

export interface NumberField {
  type: "number";
  placeholder?: string;
}

export interface BooleanField {
  type: "boolean";
}

export interface ImageField {
  type: "image";
}

export interface ObjectField {
  type: "object";
  fields: FieldType[];
}

export interface ArrayField {
  type: "array";
  canAdd: boolean;
  itemType: FieldItemType;
}

export type FieldItemType =
  | TextField
  | TextareaField
  | NumberField
  | BooleanField
  | ImageField
  | ObjectField
  | ArrayField;

export type FieldType = CommonField & FieldItemType;

export type MetaValue = {
  title: string;
  description: string;
  fields: FieldType[];
};

export type MetaType = Record<string, MetaValue>;
