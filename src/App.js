import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/button'
// import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      location:{},
      searchQuery: '',
      imgSrc: '',
      displayResults: false
    }
  }

  getLocationInfo = async(e) => {
    e.preventDefault();
    const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${this.state.searchQuery}&format=json`;
    const location = await axios.get(url);
    const locationArray = location.data;

    this.setState({
      location: locationArray[0],
      displayResults: true,
      imgSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${locationArray[0].lat},${locationArray[0].lon}&zoom=13` 
    });
  }


  render(){
    console.log('state', this.state)
    console.log(this.state.location)
    return(
      <>
        <form onSubmit={this.getLocationInfo} >
          <input onChange={(e) => this.setState({ searchQuery: e.target.value })} placeholder="city"/>
          <Button type="submit">Explore!</Button>
        
        </form>
        <h1>Welcome</h1>

        {this.state.displayResults &&
          <Card style={{ width: '22rem' }}>
            <Card.Body>
              <Card.Title>{this.state.location.display_name}</Card.Title>
              <Card.Text>
                lat: {this.state.location.lat}
              </Card.Text>
              <Card.Text>
                long: {this.state.location.lon}
              </Card.Text>
            </Card.Body>
            <Card.Img variant="top" src={this.state.imgSrc} />
          </Card>
        }
      </>
    );
  }

}

export default App;

