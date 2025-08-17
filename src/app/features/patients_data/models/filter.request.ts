import { AppUtilities } from '../../../utils/app.utilities';

export class FilterRequest {
  constructor(
    public name?: string | '' | null,
    public sexCode?: string | null,
    public userName?: string | null,
    public startDate?: Date | null,
    public endDate?: Date | null
  ) {}

  toJson(): any {
    return {
      name: this.name,
      sexCode: this.sexCode,
      userName: this.userName,
      startDate: AppUtilities.formatDateToDDMMYYYY(this.startDate!),
      endDate: AppUtilities.formatDateToDDMMYYYY(this.endDate!),
    };
  }

  static fromJson(json: any): FilterRequest {
    return new FilterRequest(
      json.name ?? null,
      json.sexCode ?? null,
      json.userName ?? null,
      json.startDate ?? null,
      json.endDate ?? null
    );
  }

  equals(other: FilterRequest): boolean {
    return (
      this.name === other.name &&
      this.sexCode === other.sexCode &&
      this.userName === other.userName &&
      this.compareDates(this.startDate, other.startDate) &&
      this.compareDates(this.endDate, other.endDate)
    );
  }

  private compareDates(
    d1: Date | null | undefined,
    d2: Date | null | undefined
  ): boolean {
    if (d1 == null && d2 == null) return true;
    if (d1 == null || d2 == null) return false;
    return d1.getTime() === d2.getTime();
  }
}
