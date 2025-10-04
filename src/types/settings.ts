import { Config } from "./configs";

export interface CommonField {
  key: string;
  label: string;
  description: string;
  // isAlwaysShow: boolean;
  isRequired: boolean;
  disabled?: boolean;
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
  needBox?: boolean;
  fields: FieldType[];
}

export interface ArrayField {
  type: "array";
  isEditableList: boolean;
  itemType: ObjectField;
  newItem: any;
  needBox?: boolean;
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
  key: string;
  title: string;
  description: string;
  fields: FieldType[];
};

export interface ISetting {
  title: string;
  key: string;
  description?: string | null;
  value: Config;
}
