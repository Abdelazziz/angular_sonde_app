import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class AppUtilities {
  public static parseDate(dateStr: string): Date {
    // Format : "dd/MM/yyyy"
    const [day, month, year] = dateStr.split('/');
    return new Date(+year, +month - 1, +day);
  }

  public static formatDateToDDMMYYYY(date: Date | null): string | null {
    if (!date) return null;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  public static toIsoDate(date: string | Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
}

export function trimRequired(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (typeof value === 'string' && value.trim().length === 0) {
      return { trimRequired: true };
    }
    return null;
  };
}
