import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container">
                <h1>Home page</h1>
                <div id="search">
                    <input type='text' placeholder='nom du manga'></input>
                    <select id="manga-type">
                        <option>shonen</option>
                        <option>shojo</option>
                        <option>seinen</option>
                    </select>
                    <input type='submit' value='recherche'></input>
                </div>
            </div>
        )
    }
}

export default Home