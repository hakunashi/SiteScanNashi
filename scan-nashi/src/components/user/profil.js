import React from 'react';
import { connect } from 'react-redux';
import { editProfil } from '../../api/apiUser';

class Profil extends React.Component {
    constructor(props) {
        super(props)
        this.user = null
    }

    render() {

        this.user = this.props.user.infos

        return (
            <div className="container">
                <h1> Profil </h1>
                {this.user !== null && <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Prénom"
                        defaultValue={this.user.firstName}
                        onChange={(e) => {
                            this.setState({ firstName: e.target.value })
                        }}
                    />
                    <br />
                    <input
                        type="text"
                        placeholder="Nom"
                        defaultValue={this.user.lastName}
                        onChange={(e) => {
                            this.setState({ lastName: e.target.value })
                        }}
                    />
                    <br />
                    <input type="submit" name="Enregister" />
                </form>}
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user
    }
}
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Profil);