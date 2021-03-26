import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

class Movie extends React.Component {


  componentDidMount = async () => {
    await this.props.getMovieInfo();
  }


  movieRender() {
    const data = this.props.movie;
    console.log('dat', data);
    return <div className="cardstuff" text='black'><Card.Title>Movies:</Card.Title><ListGroup>{data.map((item, index) => <ListGroup.Item key={index}>{item.title}<br></br>{item.popularity}<br></br>{item.overview}</ListGroup.Item>)}</ListGroup></div>
  }


  render() {
    return (
      <>
        {this.movieRender()}
      </>
    )
  }
}



export default Movie;