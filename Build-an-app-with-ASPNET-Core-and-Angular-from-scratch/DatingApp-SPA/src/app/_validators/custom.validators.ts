import { AbstractControl, ValidatorFn } from '@angular/forms';

export interface PasswordMatchValidatorError {
  mismatch: true;
}

export interface FieldMatchValidatorError {
  [key: string]: true;
}

export class CustomValidators {

  public static passwordMatchValidator(ac: AbstractControl): PasswordMatchValidatorError | null {
    return ac.get('password').value === ac.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  public static fieldMatchValidator(fieldName: string): ValidatorFn {
    const errorKey = `${fieldName}Mismatch`;
    const isExistInputValue = (value: string | null): boolean => Boolean(value);
    let applySubscriptionToValueChanges = false;

    return (currentField: AbstractControl): FieldMatchValidatorError | null => {
      const rootField: AbstractControl = currentField.root;
      const fieldToMatch: AbstractControl = rootField.get(fieldName);

      if (!fieldToMatch) {
        return null;
      }

      if (!applySubscriptionToValueChanges) {
        applySubscriptionToValueChanges = true;
        fieldToMatch.valueChanges.subscribe(() => {
          if (isExistInputValue(currentField.value)) {
            currentField.updateValueAndValidity();
          }
        });
      }

      return isExistInputValue(currentField.value) && fieldToMatch.value !== currentField.value
        ? ({ [errorKey]: true })
        : null;
    };
  }

}
