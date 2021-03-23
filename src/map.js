import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

class Map extends React.Component {

    render() {
        return (
            <Card.Img variant="top" src={this.props.imageSrc} />
        )
    }
}

export default Map;

