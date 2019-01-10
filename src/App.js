import React, { Component } from 'react';
import './App.css';
import { apiKey } from './config'
import GifCard from './components/GifCard';
import SearchBar from './components/SearchBar'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`)
    .then(res => res.json())
    .then(resJson => {
      let gifArr = resJson.data.map(gif => {
        return (
          {
            id: gif.id,
            img: gif.images.fixed_height.url
          }
        )
      })
      this.setState({ data: gifArr })
      console.log(this.state);
    })
  }
  
  render() {
    const gifs = this.state.data.map(gif => (
      <GifCard url={gif.img}/>
    ))

    return (
      <div className="App">
        <header className="App-header">
          <h1> Giphy 2.0 </h1>
          <h2> Trending</h2>
          <SearchBar/>
        </header>
        <div className="image-container">
          {gifs}
        </div>
      </div>
    );
  }
}

export default App;
