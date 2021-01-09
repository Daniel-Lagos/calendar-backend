const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {

    return (new Promise((resolve, reject) => {

        const payload = {
            uid,
            name
        }

        /*
        * payload = que es el objeto que quiero mostrar
        * procces.env = es la palabra secreta para firmar el token
        * expiresIn= la duracion
        * callback =()=> expecifica el error (Si no se puede generar el token)
        */

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No se pudo generar el token');
            }

            resolve(token);

        })

    }));


}

module.exports = {
    generateJWT
}