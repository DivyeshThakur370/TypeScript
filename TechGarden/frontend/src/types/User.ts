export type signinData = {
    email: string;
    password: string;
    _id: string
}
export type signupData = {
    email: string;
    password: string;
    conformPassword: string;
    _id: string
}

export type signInresponse={
    success:boolean;
    message: string;
    data : signinData;
    token : string;
}

export type signUpresponse={
    success:boolean;
    message: string;
    data : signupData;
}