// valide le body d'une requete selon les champs requis.

export function validate(body, fields) {
    const data = {};
    const missing = [];

    for (const f of fields) {
        data[f] = typeof body[f] === 'string' ? body[f].trim() : body[f];

        if (data[f] === '' || data[f] === undefined || data[f] === null) {
            missing.push(f)
        }
    }

    if (missing.length > 0) {
        const err = new Error(`Champs obligatoires manquants : ${missing.join(', ')}`);
        err.status = 400;
        throw err
    }
    return data
}