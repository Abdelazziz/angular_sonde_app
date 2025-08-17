export class AuthResponse {
  constructor(public accessToken: string, public refreshToken: string) {}

  static fromJson(json: any): AuthResponse {
    return new AuthResponse(json.token, json.refreshToken);
  }
}
