import { AbstractControl } from '@angular/forms';

export interface PasswordMatchValidatorError {
  mismatch: true;
}

export const passwordMatchValidator = (ac: AbstractControl): PasswordMatchValidatorError | null => {
  return ac.get('password').value === ac.get('confirmPassword').value
    ? null
    : { mismatch: true };
};
