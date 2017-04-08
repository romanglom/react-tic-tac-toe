import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';

import TicTacToeComponent from './tic-tac-toe';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <h1 className="text-center">Tic-Tac-Toe</h1>
                    </Col>
                    <Col md={12}>
                        <TicTacToeComponent></TicTacToeComponent>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default App;