import React from 'react';
import axios from 'axios';

class Forecast extends React.Component {
  constructor(props){
    super(props);
    this.state={
      weatherForecast:[],
      city: ''
    }
  }

  componentDidMount = async() => {
    const SERVER = 'https://jessi301d72cityexplorerapi.herokuapp.com';
    const forecast = await axios.get(`${SERVER}/weather`);
    const forecastArray = forecast.data.forecast;
    const cityData = forecast.data.city;
    this.setState({ city: cityData })
    this.setState({ weatherForecast: forecastArray });
  }

  forecastRender() {
    const data = this.state.weatherForecast;
    return <div><h2>Weather Forecast:</h2><ul>{data.map(item => <li>{item.date}: {item.description}</li>)}</ul></div>
  }

  render() {
    return(
      <>
        {this.forecastRender()}
      </>

    )
  }
}

export default Forecast;