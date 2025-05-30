import React from "react";

export type contactData = {
    image: string;
    name:string;
    email:string;
    number:string;
    userId:string;
    _id:string;
}
export type resCreateContact={
    success: boolean;
    data : contactData;
    message : string;
}
export type resContactData={
    data : contactData[]
}

export type childrenProp={
    children: React.ReactNode
}