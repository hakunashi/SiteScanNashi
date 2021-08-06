import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { checkToken } from '../api/apiAuth';
import { connectUser } from '../actions/user/userAction';

export default function (ChildComponent, withAuth = false) {
    class RequireDataAuth extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                redirect: false
            }
        }

        componentDidMount() {
            const token = window.localStorage.getItem('scn-token');

            if (this.props.user.isLogged === false) {

                if (token === null) {

                    if (withAuth) {
                        this.setState({ redirect: true })
                    }

                } else {

                    checkToken()
                        .then((res) => {

                            if (res.status !== 200) {

                                if (withAuth) {
                                    this.setState({ redirect: true })
                                }

                            } else {

                                this.props.connectUser(res.user);

                            }

                        })

                }

            }
        }

        render() {

            if (this.state.redirect) {
                return <Redirect to='/login' />
            }

            return (
                <ChildComponent {...this.props} />
            )

        }

    }

    const mapStateToProps = (store) => {
        return {
            user: store.user
        }
    }

    const mapDispatchToProps = {
        connectUser
    }

    return connect(mapStateToProps, mapDispatchToProps)(RequireDataAuth);

}