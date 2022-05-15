/** @param {Env} env **/
export default (env) => {
    return {
        requireOptIn: env.get('COOKIES_OPTIN') ?? true,
        secure: env.get('SECURE_COOKIES') ?? true,
        sameSite: env.get('SAMESITE_COOKIES') ?? true,
    };
};