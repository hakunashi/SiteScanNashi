const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'chaton';

module.exports = (app, db) => {

    const userModel = require('../models/UserModel')(db);

    app.get('/api/v1/users/all', async (req, res, next) => {

        let users = await userModel.getAllUsers();

        if (users.code) {
            res.json({ status: 500, err: users });
        }

        res.json({ status: 200, users: users });

    })

    app.get('/api/v1/user/one/:id', async (req, res, next) => {

        let id = req.params.id;
        let users = await userModel.getOneUser(id);

        if (users.code) {
            res.json({ status: 500, err: users })
        }

        res.json({ status: 200, users: users })

    })

    app.post('/api/v1/users/save', async (req, res, next) => {

        let result = await userModel.saveOneUser(req);
        let users = await userModel.getAllUsers();

        if (result.code) {
            res.json({ status: 500, err: result });
        }

        if (users.code) {
            res.json({ status: 500, err: users });
        }

        res.json({ status: 200, result: result, users: users });

    })

    app.post('/api/v1/users/login', async (req, res, next) => {

        let user = await userModel.getOneUserByEmail(req.body.email);

        if (user.length === 0) {
            res.json({ status: 404, msg: 'email non enregistré dans la base de données' });
        } else {

            let same = await bcrypt.compare(req.body.password, user[0].password);

            if (same === true) {

                const payload = { email: req.body.email, id: user[0].id };
                const token = jwt.sign(payload, secret);

                res.json({ status: 200, token: token, user_id: user[0].id });

            } else {
                res.json({ status: 401, msg: 'mauvais mot de passe' });
            }
        }

    })

    app.put('/api/v1/users/update/:id', async (req, res, next) => {

        let id = req.params.id;
        let result = await userModel.updateOneUser(req, id);
        let users = await userModel.getAllUsers();

        if (result.code) {
            res.json({ status: 500, err: result });
        }

        if (users.code) {
            res.json({ status: 500, err: users });
        }

        res.json({ status: 200, result: result, users: users });

    })

    app.delete('/api/v1/users/delete/:id', async (req, res, next) => {

        let id = req.params.id;
        let result = await userModel.deleteOneUser(id);
        let users = await userModel.getAllUsers();

        if (result.code) {
            res.json({ status: 500, err: result });
        }

        if (users.code) {
            res.json({ status: 500, err: users });
        }

        res.json({ status: 200, result: result, users: users });

    })

}