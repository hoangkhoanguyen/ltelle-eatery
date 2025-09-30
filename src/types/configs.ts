export type TextValue = string;
export type NumberValue = number;
export type BooleanValue = boolean;
export interface ImageValue {
  url: string;
  alt: string;
}
export type ObjectValue = Record<string, Value>;
export type ArrayValue = Value[];

export type Value =
  | { value: TextValue }
  | { value: NumberValue }
  | { value: BooleanValue }
  | { value: ImageValue }
  | { value: ObjectValue }
  | { value: ArrayValue };

export type ConfigValue = Record<string, Value>;

export type Config = Record<string, ConfigValue>;
