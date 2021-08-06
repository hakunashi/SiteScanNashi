import React from "react";
import { Redirect } from "react-router";
import { saveUser } from "../../api/apiUser"

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            errors: {},
            redirect: false
        }
    }

    onSubmitForm = () => {
        let formValid = true;
        let errors = {}
        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }

        // Prénom
        if (!data.firstName) {
            formValid = false;
            errors['firstName'] = 'Veuillez entrer un prénom.'
        }

        if (data.firstName.length > 0) {
            if (!data.firstName.match(/^[a-zA-Z]+$/)) {
                formValid = false;
                errors['firstName'] = 'Entrer seulement des lettres.'
            }
        }

        // Nom
        if (!data.lastName) {
            formValid = false;
            errors['lastName'] = 'Veuillez entrer un nom.'
        }

        if (data.lastName.length > 0) {
            if (!data.lastName.match(/^[a-zA-Z]+$/)) {
                formValid = false;
                errors['lastName'] = 'Entrer seulement des lettres.'
            }
        }

        // Mail
        if (!data.email) {
            formValid = false;
            errors['email'] = 'Veuillez entrer un mail.'
        }

        if (data.email.length > 0) {
            let lastAtPos = data.email.lastIndexOf('@');
            let lastDotPos = data.email.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && data.email.indexOf('@@') === -1 && lastDotPos > 2 && (data.email.length - lastDotPos) > 2)) {
                formValid = false;
                errors['email'] = 'Mail invalide.'
            }
        }

        // Mot de passe
        if (!data.password) {
            formValid = false;
            errors['password'] = 'Veuillez entrer un mot de passe.'
        }

        if (data.password.length > 0) {
            if (data.password.length < 7) {
                formValid = false;
                errors['password'] = 'Le mot de passe doit être supérieur à 7 caractères.'
            }
        }

        if (formValid) {
            saveUser(data)
                .then((res) => {
                    if (res.status === 200) {
                        this.setState({ redirect: true });
                    }
                })
        } else {
            this.setState({ errors: errors })
        }

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }

        return (
            <div className="container">
                <h1>Créer un compte</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        this.onSubmitForm();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Prénom"
                        value={this.state.firstName}
                        onChange={(e) => {
                            this.setState({ firstName: e.target.value })
                        }}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["firstName"]}</span>
                    <br />
                    <input
                        type="text"
                        placeholder="Nom"
                        value={this.state.lastName}
                        onChange={(e) => {
                            this.setState({ lastName: e.target.value })
                        }}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["lastName"]}</span>
                    <br />
                    <input
                        type="text"
                        placeholder="Mail"
                        value={this.state.email}
                        onChange={(e) => {
                            this.setState({ email: e.target.value })
                        }}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                    <br />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={this.state.password}
                        onChange={(e) => {
                            this.setState({ password: e.target.value })
                        }}
                    />
                    <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                    <br />
                    <input type="submit" name="Enregister" />
                </form>
            </div>
        )
    }
}

export default Register;