//Imports
import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Map from './map.js';
import Error from './error.js';
import Weather from './Weather.js';
import Movies from './Movies.js';
import './App.css';

//Component Class
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      location:{},
      searchQuery: '',
      imgSrc: '',
      displayResults: false,
      hasError: null,
      weatherForecast:[],
      movie:[],
    }
    this.getLocationInfo = this.getLocationInfo.bind(this);
  }

  getWeatherInfo = async(e) => {
    const forecast = await axios.get(`${process.env.REACT_APP_SERVER}/weather?lat=${this.state.location.lat}&lon=${this.state.location.lon}`);
    console.log('forecast@@@@@', forecast.data);
    const forecastArray = forecast.data;
    // console.log('%%%%%array', forecastArray);
    this.setState({ weatherForecast: forecastArray });
    console.log('stateweather----------', this.state.weatherForecast);
  }

  getMovieInfo = async(e) => {
    const movie = await axios.get(`${process.env.REACT_APP_SERVER}/movies?city=${this.state.searchQuery}`);
    const movieArray = movie.data;
    this.setState({ movie: movieArray });
  }
  
  getLocationInfo = async(e) => {
    e.preventDefault();
    console.log('statesearch', this.state.searchQuery);
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${this.state.searchQuery}&format=json`;
    await axios.get(url)
    .then((location) => {
      console.log('locdata', location.data);
      const locationArray = location.data;
      this.setState({
        location: locationArray[0],
        displayResults: true,
        hasError: null,
        imgSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${locationArray[0].lat},${locationArray[0].lon}&zoom=13` 
      });
      this.getWeatherInfo();
      this.getMovieInfo();
    }) 
    .catch(error => {
      this.setState({ hasError: error })
      this.setState({ displayResults: false });
    })
  }
  

  render(){
    return(
      <>
        <center>
        <h1 className="Object" id="title" >Welcome to City Explorer.</h1>
        <h6 className="Object" id="title" >Serving you all your forecast and movie needs since 2021.</h6>
        <form className="Object" onSubmit={this.getLocationInfo}>
          <input onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="enter a city"/>
          <button type="submit">Explore!</button>
        </form>
        </center>

        {this.state.displayResults &&
          <center>
          <Card className="Render" bg='dark' text='white' style={{ width: '40rem' }}>
            <Map className="Render" imageSrc={this.state.imgSrc}/>
            <Card.Body>
              <Card.Title>{this.state.location.display_name}</Card.Title>
              <Card.Text>
                lat: {this.state.location.lat}
              </Card.Text>
              <Card.Text>
                long: {this.state.location.lon}
              </Card.Text>
              <Movies movie={this.state.movie} getMovieInfo={this.getMovieInfo}/>
              <Weather className="cardstuff"  style={{ width: '19.1rem' }} weatherForecast={this.state.weatherForecast} getWeatherInfo={this.getWeatherInfo}/>
            </Card.Body>
          </Card>
          <footer id="title">
            &copy;Jessi Velazquez, LocationIQ, Weatherbit
          </footer>
          </center>
        }

        {this.state.hasError &&
          <>
            <center id="title">
            <Error handleError={this.state.hasError}></Error>
            </center>
          </>
        }  
        
      </>
    );
  }

}

//Exports
export default App;

