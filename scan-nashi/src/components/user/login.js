import React from 'react';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../api/apiUser'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: null,
            redirect: false
        }
    }

    onSubmitForm = () => {
        let data = {
            email: this.state.email,
            password: this.state.password
        }

        loginUser(data)
            .then((res) => {

                if (res.status === 200) {
                    window.localStorage.setItem('scn-token', res.token);
                    this.setState({ redirect: true })
                } else {
                    this.setState({errors : 'identifiants erronés'})
                }

            })

    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }

        return (
            <div className="container">
                <h1>S'enregistrer</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        this.onSubmitForm();
                    }}
                >

                    <input
                        type="text"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={(e) => {
                            this.setState({ email: e.target.value })
                        }}
                    />
                    <br/>
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={this.state.password}
                        onChange={(e) => {
                            this.setState({ password: e.target.value })
                        }}
                    />
                    <br/>

                    <input type="submit" name="Enregister" />
                </form>
                <span style={{ color: "red" }}>{this.state.errors}</span>
            </div>

        )
    }

}

export default Login