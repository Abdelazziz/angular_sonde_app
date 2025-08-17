export class AuthRequest {
  constructor(public userName: string, public password: string) {}

  static fromJson(json: any): AuthRequest {
    return new AuthRequest(json.username || '', json.password || '');
  }

  toJson(): any {
    return {
      username: this.userName,
      password: this.password,
    };
  }
}
