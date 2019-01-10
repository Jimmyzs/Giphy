import React, { Component } from 'react';
import './App.css';
import { apiKey } from './config'
import GifCard from './components/GifCard';
import SearchBar from './components/SearchBar'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [],
      isError: false
    }
  }

  componentDidMount() {
    this.searchGif("trending")
  }

  parseData = (json) => {
    let gifArr = json.data.map(gif => {
      return (
        {
          id: gif.id,
          img: gif.images.fixed_height.url
        }
      )
    })
    this.setState({ data: gifArr })
  }

  searchGif(type, str) {
    console.log(str);
    let url = ""
    if (type === "search")
      url = `http://api.giphy.com/v1/gifs/search?q=${str}&api_key=${apiKey}`
    else if (type === "trending")
      url = `http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`
    else if (type === "random")
      url = `http://api.giphy.com/v1/gifs/random?api_key=${apiKey}`

    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.parseData(data);
    })
    .catch(err => {
      console.log(err)
      this.setState({isError: true})
    })
  }
  
  render() {
    const gifs = this.state.data.map(gif => (
      <GifCard key={gif.id} url={gif.img}/>
    ))

    return (
      <div className="App">
        <header className="App-header">
          <h1> Giphy 2.0 </h1>
          <h2> Trending</h2>
          <SearchBar handleChange={(e) => {
            if (e.keyCode != 13) {
              this.setState({ search: e.target.value.trim().split(' ').join('+')})
            }
            else {
              // console.log(e.target.value.trim().split(' ').join('+') );
              this.searchGif("search", e.target.value.trim().split(' ').join('+') );
            }
          }}/>
            <button onClick={() => this.searchGif("search", this.state.search)}> Submit </button>
            <button onClick={() => this.searchGif("trending")}> Trending </button>
            <button onClick={() => this.searchGif("random")}> Random </button>
        </header>
        <div className="image-container">
          {!this.state.isError ? gifs : "No Results"}
        </div>
      </div>
    );
  }
}

export default App;
