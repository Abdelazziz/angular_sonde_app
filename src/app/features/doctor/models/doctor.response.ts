export class DoctorResponse {
  constructor(
    public id: number,
    public name: string,
    public userName: string,
    public role?: string
  ) {}

  static fromJson(json: any): DoctorResponse {
    return new DoctorResponse(
      json.id,
      json.name,
      json.username,
      json.role || ''
    );
  }
}
