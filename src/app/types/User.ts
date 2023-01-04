export type User = {
    firstName: string;
    email: string;
    idToken: string;
    photoUrl: string;
}

export type loginUserResponse = {
    token: string;
}