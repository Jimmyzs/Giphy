import React, { Component } from 'react';
import './SearchBar.css'

class SearchBar extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <input class="searchBar" placeholder="Enter gif name..." type="text" onKeyDown={this.props.handleChange}/>
            </div>
        );
    }
}

export default SearchBar;