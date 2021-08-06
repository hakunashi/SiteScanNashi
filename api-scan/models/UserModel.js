const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (_db) => {
    db = _db;
    return UserModel
}

class UserModel {

    static getAllUsers() {

        return db.query('SELECT * FROM users')
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err
            })
            
    }

    static getOneUser(id) {

        return db.query('SELECT * FROM users WHERE id=?', [id])
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err
            })

    }

    static getOneUserByEmail(email) {

        return db.query('SELECT * FROM users WHERE email=?', [email])
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err
            })

    }

    static async saveOneUser(req) {

        let hash = await bcrypt.hash(req.body.password, saltRounds)

        return db.query('INSERT INTO users (`firstName`, `lastName`, `email`, `password`, `role`, `creationTimestamp`) VALUES (?, ?, ?, ?, "utilisateur", NOW())', [req.body.firstName, req.body.lastName, req.body.email, hash])
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err
            })
    }

    static async updateOneUser(req, id) {

        let hash = await bcrypt.hash(req.body.password, saltRounds)

        return db.query('UPDATE users SET firstName = ?, lastName = ?, email = ?, password = ? WHERE id = ?', [req.body.firstName, req.body.lastName, req.body.email, hash, id])
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err
            })
    }

    static deleteOneUser(id) {

        return db.query('DELETE FROM users WHERE id = ?', [id])
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err
            })

    }

}