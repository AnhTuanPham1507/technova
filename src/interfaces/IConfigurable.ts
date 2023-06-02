export interface IConfigurable {
  getKey(): string;
  getValue(): Record<string, any>;
  getConfigType(): string;
}
