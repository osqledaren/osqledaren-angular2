export interface AccessToken {
    token: string,
    refreshToken: string,
    type: string,
    expires: number,
    fetched: number,
}