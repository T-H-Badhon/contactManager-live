import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type TContact = {
  _id: string;
  name: string;
  email?: string;
  phoneNumber: string;
  address: string;
  ProfilePhoto: string;
  isFavourite: boolean;
};

export type TError = FetchBaseQueryError & {
  data: {
    success: boolean;
    message: string;
    errorMessage: string;
  };
};

export type TUpdateContact = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  photoUrl?: string;
};
