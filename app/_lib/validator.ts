export default class Validator {
  private value: string;
  private errors: string[];

  constructor(value: string) {
    this.value = value.trim();
    this.errors = [];
  }

  isEmail(message = 'Error from isEmail'): this {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(this.value)) {
      this.errors.push(message);
    }
    return this;
  }

  isUrl(message = 'Error form isUrl'): this {
    const regex = /^http[s]?:\/\/([\S]{3,})/i;
    if (!regex.test(this.value)) {
      this.errors.push(message);
    }
    return this;
  }

  minLength(min: number, message = 'Error from minLength'): this {
    if (this.value.length < min) {
      this.errors.push(message);
    }
    return this;
  }

  maxLength(max: number, message = 'Error from maxLength'): this {
    if (this.value.length > max) {
      this.errors.push(message);
    }
    return this;
  }

  required(message = 'Error from required'): this {
    if (this.value.length < 1) {
      this.errors.push(message);
    }
    return this;
  }

  validate(): boolean {
    return this.errors.length === 0;
  }

  getErrors(): string[] {
    return this.errors;
  }
}
