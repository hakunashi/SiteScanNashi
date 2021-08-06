import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logoutUser } from '../../actions/user/userAction';

class Logout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect : false
        }
    }

    componentDidMount() {

        window.localStorage.removeItem('scn-token');
        this.props.logoutUser();
        this.setState({redirect : true});

    }

    render() {

        if(this.state.redirect) {
            return <Redirect to='/' />
        }

        return(
            <div>
            </div>
        )

    }

}

const mapStateToProps = (store) =>{
    return {
        user: store.user
    }
}

const mapDispatchToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);