import { AppUtilities } from '../../../utils/app.utilities';

export class PatientDataResponse {
  constructor(
    public id: number,
    public name: string,
    public sex: string,
    public phone: string,
    public address: string,
    public description: string,
    public birthdate: Date,
    public startdate: Date | null,
    public enddate: Date | null,
    public doctorName: string,
    public hospitalName: string,
    public probeName: string,
    public totalElments: number
  ) {}

  static fromJson(json: any): PatientDataResponse {
    return new PatientDataResponse(
      json.id,
      json.name,
      json.sex,
      json.phone,
      json.address,
      json.description,
      AppUtilities.parseDate(json.birthdate),
      json.startdate ? AppUtilities.parseDate(json.startdate) : null,
      json.enddate ? AppUtilities.parseDate(json.enddate) : null,
      json.doctorName,
      json.hospitalName,
      json.probeName,
      json.totalElments
    );
  }
}
