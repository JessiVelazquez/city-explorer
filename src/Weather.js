import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import WeatherDay from './WeatherDay';

class Weather extends React.Component {


  render() {
    return (
      <Card 
        className="cardstuff" 
        style={{ width: '19.1rem' }}
        bg="secondary"
        text="black"
      >
        <Card.Body style={{ width: '19.1rem' }} horizontal="md" >
            <WeatherDay className="cardstuffinner"
            weatherForecast={this.props.weatherForecast} 
            getWeatherInfo={this.props.getWeatherInfo}
            />
        </Card.Body>
      </Card>
    )
  }
}

export default Weather;