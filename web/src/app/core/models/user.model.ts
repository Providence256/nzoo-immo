


// src/app/core/models/user.model.ts
export interface User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    profileImage?: string;
    role: 'user' | 'host' | 'admin';
    token?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }