export class AuthRefreshTokenRequest {
  constructor(public refreshToken: string) {}

  toJson(): any {
    return {
      refreshToken: this.refreshToken,
    };
  }
}
