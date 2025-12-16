// User domain model - Complete schema

export interface User {
    id: string;
    email: string;
    name: string;
    passwordHash?: string; // Opcional no client-side (vem do backend)
    profileImage?: string; // URL ou base64
    notificationsEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'> & {
    password: string; // Senha em texto plano (será hasheada no backend)
};

export type UpdateUserInput = Partial<Omit<User, 'id' | 'email' | 'passwordHash' | 'createdAt' | 'updatedAt'>>;

export type UpdatePasswordInput = {
    currentPassword: string;
    newPassword: string;
};
