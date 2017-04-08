import React from 'react';
import {Modal, Button} from 'react-bootstrap';

class ChooseOpponentModalComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal show={this.props.showModal}>
                <Modal.Header>
                    <Modal.Title>Choose Opponent</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button bsStyle="success" className="pull-left" onClick={() => this.props.chooseOpponent(false)}>
                        Human
                    </Button>
                    <Button bsStyle="primary" className="pull-right" onClick={() => this.props.chooseOpponent(true)}>
                        Computer
                    </Button>
                </Modal.Footer>

            </Modal>
        )
    }
}

export default ChooseOpponentModalComponent;