/** @param {Env} env **/
export default (env) => {
    return {
        name: env.get('name') ?? 'Genesis Website',
        domain: env.get('domain') ?? 'localhost',
    };
};