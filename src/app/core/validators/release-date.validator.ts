import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function releaseDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const [year, month, day] = control.value.split('-').map(Number);

    const release = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return release < today ? { releasePast: true } : null;
  };
}
