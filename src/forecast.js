import React from 'react';
import axios from 'axios';

class Forecast extends React.Component {
  constructor(props){
    super(props);
    this.state={

    }
  }

  componentDidMount = async() => {
    await this.props.getWeatherInfo();
    // // const SERVER = 'https://jessi301d72cityexplorerapi.herokuapp.com';
    // const SERVER = 'http://localhost:3001';
    // console.log(this.props.city);
    // const forecast = await axios.get(`${SERVER}/weather?city_name=${this.props.city}`);
    // const forecastArray = forecast.data;
    // console.log(forecastArray);
    // this.setState({ weatherForecast: forecastArray });
  }


  forecastRender() {
    const data = this.props.weatherForecast;
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