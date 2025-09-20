import { FormControl } from '@angular/forms';
import { releaseDateValidator } from './release-date.validator';

describe('releaseDateValidator', () => {
  const validator = releaseDateValidator();

  it('should return null when value is empty', () => {
    const control = new FormControl('');
    expect(validator(control)).toBeNull();
  });

  it('should return an error when date is in the past', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    const value = pastDate.toISOString().split('T')[0];

    const control = new FormControl(value);
    expect(validator(control)).toEqual({ releasePast: true });
  });

  it('should return null when date is today', () => {
    const today = new Date();
    const value = today.toISOString().split('T')[0];

    const control = new FormControl(value);
    expect(validator(control)).toBeNull();
  });

  it('should return null when date is in the future', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    const value = futureDate.toISOString().split('T')[0];

    const control = new FormControl(value);
    expect(validator(control)).toBeNull();
  });
});
