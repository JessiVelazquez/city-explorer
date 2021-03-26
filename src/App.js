import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Map from './map.js';
import Error from './error.js';
import Weather from './Weather.js';
import './App.css';

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
    }
    this.getLocationInfo = this.getLocationInfo.bind(this);
  }

  getWeatherInfo = async(e) => {
    // const SERVER = 'https://jessi301d72cityexplorerapi.herokuapp.com/';
    // const SERVER = 'http://localhost:3001';
    const forecast = await axios.get(`${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.searchQuery}`);
    const forecastArray = forecast.data;
    this.setState({ weatherForecast: forecastArray });
  }
  
  async getLocationInfo(e) {
    e.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${this.state.searchQuery}&format=json`;
    await axios.get(url)
    .then((location) => {
      const locationArray = location.data;
      this.setState({
        location: locationArray[0],
        displayResults: true,
        hasError: null,
        imgSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${locationArray[0].lat},${locationArray[0].lon}&zoom=13` 
      });
      this.getWeatherInfo();
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
        <h1 className="Object" >Welcome to City Explorer.</h1>
        <h6 className="Object" >Serving you all your forecast and movie needs since 2021.</h6>
        <form className="Object" onSubmit={this.getLocationInfo}>
          <input onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="enter a city"/>
          <button type="submit">Explore!</button>
        </form>
        </center>
        <div>
          <p></p>
        </div>
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
              <Weather weatherForecast={this.state.weatherForecast} getWeatherInfo={this.getWeatherInfo}/>
            </Card.Body>
          </Card>
          <footer>
            &copy;Jessi Velazquez, LocationIQ, Weatherbit
          </footer>
          </center>
        }
        {this.state.hasError &&
          <>
            <center>
            <Error handleError={this.state.hasError}></Error>
            </center>
          </>
        }  
        
      </>
    );
  }

}

export default App;

