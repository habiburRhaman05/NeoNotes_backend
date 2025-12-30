import { auth } from "../../lib/auth";

export const updatePassword = async (data: any, headers: Headers) => {
    return await auth.api.changePassword({
        body: {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            revokeOtherSessions: true
        },
        headers: headers
    });
};

export const getProfile = async (headers: Headers) => {
    return await auth.api.getSession({ headers });
};