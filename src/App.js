import React, { Component } from 'react';
import './App.css';
import { apiKey } from './config'
import GifCard from './components/GifCard';
import SearchBar from './components/SearchBar'
import logo from './static/logo.png';
import loading from './static/loading.gif';

const LoadingComponent = props => <img src={props.src}/>

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      data: [],
      isError: false,
      isLoading: false
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
    this.setState({
      isLoading: false,
      data: gifArr
    })
  }

  searchGif(type, str) {
    let url = ""
    if (type === "search")
      url = `http://api.giphy.com/v1/gifs/search?q=${str}&api_key=${apiKey}`
    else if (type === "trending") {
      this.setState({ search: "Trending"} )
      url = `http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`
    }
    else if (type === "random") {
      this.setState({ search: "Random"} )
      url = `http://api.giphy.com/v1/gifs/random?api_key=${apiKey}`
    }

    fetch(url)
    .then(res => {
      this.setState({ isLoading: true });
      return res.json()
    })
    .then(data => {
      if (type === "random") {
        let rand = {
          id: data.data.id,
          img: data.data.images.fixed_height.url
        }
        this.setState({
          isLoading: false,
          data: [rand]
        })
        console.log(this.state)
      }
      else {
        this.parseData(data);
      }
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
          <img className="logo" src={logo}/>
          <h2> {this.state.search} </h2>
          <SearchBar handleChange={(e) => {
            var input = String.fromCharCode(e.keyCode);
            if(/[a-zA-Z0-9-_ ]/.test(input) || e.keyCode === 13 || e.keyCode === 8) {
              if (e.keyCode === 8) {
                this.setState({ search: e.target.value.substr(0, e.target.value.length-1).trim().split(' ').join('+') })
              }
              else if (e.keyCode !== 13 && String.fromCharCode(e.keyCode)) {
                let val = e.target.value;
                val += input.toLowerCase();
                this.setState({ search: val.trim().split(' ').join('+') })
              }
              else {
                this.searchGif("search", e.target.value.trim().split(' ').join('+') );
              }
            }
          }}/>
            <div className="buttons">
              <button class="giphyButton" onClick={() => this.searchGif("search", this.state.search)}> Submit </button>
              <button class="giphyButton" onClick={() => this.searchGif("trending")}> Trending </button>
              <button class="giphyButton" onClick={() => this.searchGif("random")}> Random </button>
            </div>
        </header>
        <div className="image-container">
          {
            !this.state.isError ? 
              this.state.isLoading ?
                <LoadingComponent src={loading}/> :
                  gifs : 
                    "No Results"
          }
        </div>
      </div>
    );
  }
}

export default App;
