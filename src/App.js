import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Map from './map.js';
import Error from './error.js';
import Forecast from './forecast.js';
// import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      location:{},
      searchQuery: '',
      imgSrc: '',
      displayResults: false,
      hasError: null,
    }
  }
  
  getLocationInfo = async(e) => {

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
    }) 
    .catch(error => {
      console.log(error);
      this.setState({ hasError: error })
      this.setState({ displayResults: false });
    })
  }
  

  render(){
      

    return(
      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.getLocationInfo}>
          <input onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="enter a city"/>
          <Button type="submit">Explore!</Button>
        </form>
        <div>
          <p></p>
        </div>
        {this.state.displayResults &&
          <Card bg='dark' text='white' style={{ width: '22rem' }}>
            <Card.Body>
              <Card.Title>{this.state.location.display_name}</Card.Title>
              <Card.Text>
                lat: {this.state.location.lat}
              </Card.Text>
              <Card.Text>
                long: {this.state.location.lon}
              </Card.Text>
              <Forecast/>
            </Card.Body>
            <Map imageSrc={this.state.imgSrc}/>
          </Card>
        }
        {this.state.hasError &&
          <>
            <Error handleError={this.state.hasError}></Error>
          </>
        }  
        
      </>
    );
  }

}

export default App;

