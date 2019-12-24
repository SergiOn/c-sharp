import { AbstractControl } from '@angular/forms';

export interface FieldMatchValidatorError {
  [key: string]: true;
}

export const fieldMatchValidator = (fieldName: string) => (ac: AbstractControl): FieldMatchValidatorError | null => {
  const rootField: AbstractControl = ac.root;
  const field: AbstractControl = rootField && rootField.get(fieldName);

  return field && field.value !== ac.value
    ? ({ [`${fieldName}Mismatch`]: true })
    : null;
};
