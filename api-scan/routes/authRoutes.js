const withAuth = require('../withAuth');

module.exports = (app, db) => {

    const userModel = require('../models/UserModel')(db);

    app.get('/auth/checkToken', withAuth, async (req, res, next) => {

        let user = await userModel.getOneUser(req.id);

        if (user.code) {
            res.json({ status: 500, msg: 'aucun user associé', err: user })
        }

        res.json({ status: 200, msg: 'token ok', user: user[0] })

    })

}