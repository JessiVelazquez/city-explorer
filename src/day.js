import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';

class WeatherDay extends React.Component {
  constructor(props){
    super(props);
    this.state={
    }
  }


  render() {
    console.log('weatherDay', this.props.weatherForecast);
    return(
      <Card style={{ width: '18rem' }}>
        <Card.Header>{this.props.weatherForecast[0].date}</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item></ListGroup.Item>
        </ListGroup>
      </Card>
    )
  }
}

export default WeatherDay;

