import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

class WeatherDay extends React.Component {


  componentDidMount = async () => {
    await this.props.getWeatherInfo();
  }


  forecastRender() {
    const data = this.props.weatherForecast;
    return <div text='black'><Card.Title>Weather Forecast:</Card.Title><ListGroup>{data.map((item, index) => <ListGroup.Item key={index}>{item.date}<br></br>{item.highTemp} c<br></br>{item.lowTemp} c<br></br>{item.description}</ListGroup.Item>)}</ListGroup></div>
  }


  render() {
    return (
      <>
        {this.forecastRender()}
      </>
    )
  }
}



export default WeatherDay;