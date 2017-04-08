import React from 'react';

import {Col, Button} from 'react-bootstrap';

class OptionComponent extends React.Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (this.props.label === "") {
            this.props.onClick(this.props.positionX, this.props.positionY);
        }
    }

    render() {
        return (
            <Col md={4} className="option-container">
                <Button className="option" onClick={this.onClick}>
                    {this.props.label}
                </Button>
            </Col>
        )
    }
}

export default OptionComponent;