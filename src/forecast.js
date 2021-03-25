import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherDay from './day.js';


class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount = async () => {
    console.log('props', this.props);
    await this.props.getWeatherInfo();
  }


  forecastRender() {
    const data = this.props.weatherForecast;
    return (
      <div>
        <h2>Weather Forecast:</h2>
        <ul>
          {data.map(item => {
            return (
              <li>{item.date}: {item.description}</li>
            )
          })
          }
        </ul>
      </div>
    )
  }

  render() {
    console.log('within forecast', this.props.weatherForecast);
    return (
      <>
        {/* {this.forecastRender()} */}
        <Card style={{ width: '18rem' }}>
          <Card.Header>Weather Forecast</Card.Header>
            <WeatherDay weatherForecast={this.props.weatherForecast} className="WeatherDay" />
        </Card>
      </>
    )
  }
}

export default Forecast;