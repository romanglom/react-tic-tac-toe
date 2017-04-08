import React from 'react';

import {Grid, Row, Col, Well} from 'react-bootstrap';

class WinnerComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="winner-background">
                <Grid>
                    <Row>
                        <Col md={12} className="text-center">
                            <Well>
                                <h1>{this.props.message}</h1>
                            </Well>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default WinnerComponent;