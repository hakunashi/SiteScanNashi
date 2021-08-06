import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logoutUser } from '../actions/user/userAction'

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-absolute bg-dark">
                <div className="container">
                    <a href="/" className="navbar-brand">
                        Scan nashi
                    </a>
                </div>
                <ul className="navbar-nav ml-auto">

                    <li className="nav-item">
                        <a href="/" className="nav-link">
                            acceuil
                        </a>
                    </li>

                    {
                        this.props.user.isLogged === false &&
                        <li className="nav-item">
                            <a href="/login" className="nav-link">
                                Connexion
                            </a>
                        </li>
                    }

                    {
                        this.props.user.isLogged === false &&
                        <li className="nav-item">
                            <a href="/register" className="nav-link">
                                Créer un compte
                            </a>
                        </li>
                    }

                    {
                        this.props.user.isLogged === true &&
                        <li className="nav-item">
                            <a href="/profil" className="nav-link">
                                {this.props.user.infos.firstName}
                            </a>
                        </li>
                    }

                    {
                        this.props.user.isLogged === true &&
                        <li className="nav-item">
                            <a href="/logout" className="nav-link">
                                Déconnexion
                            </a>
                        </li>
                    }

                </ul>
            </nav>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
}
const mapDispatchToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);