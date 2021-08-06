const jwt = require('jsonwebtoken');
const secret = 'chaton';

const withAuth = (req, res, next) => {

    const token = req.headers['x-access-token'];

    if (token === undefined) {
        res.json({ status: 404, msg: "Pas de token" })
    } else {

        jwt.verify(token, secret, (err, decode) => {
            if (err) {

                res.json({ status: 401, msg: "attention Token non valide" })
            } else {
                // bon token on passe à la suite

                // le token est bon, je peux récupérer l'id de l'utilisateur dans le token
                // on avait enregister celui-ci lors du login
                // je le stock dans le req de la fonction suivante
                req.id = decode.id;
                next()
            }
        })


    }


}
// on export le middleware
module.exports = withAuth;