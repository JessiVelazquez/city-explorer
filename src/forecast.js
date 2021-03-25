import React from 'react';


class Forecast extends React.Component {
  constructor(props){
    super(props);
    this.state={

    }
  }

  componentDidMount = async() => {
    await this.props.getWeatherInfo();
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