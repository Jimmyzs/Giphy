import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                Search Bar: 
                <input type="text" onKeyDown={this.props.handleChange}/>
            </div>
        );
    }
}

export default SearchBar;