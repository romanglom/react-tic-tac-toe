import React from 'react';
import {Row, Col, Button, Glyphicon} from 'react-bootstrap';

import matrixUtils from '../../utils/matrix-utils';
import OptionComponent from './option/OptionComponent';
import WinnerBackgroundComponent from './winner/WinnerBackgroundComponent';

const LABEL_X = "X";
const LABEL_O = "O";
const EMPTY = "";
const MESSAGE_PLAYER_ONE_WINNER = "Player 1 Winner!";
const MESSAGE_PLAYER_TWO_WINNER = "Player 2 Winner!";
const MESSAGE_DRAW = "DRAW!";

class TicTacToeComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTurnLabel: LABEL_X,
            currentMatrix: [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]],
            turnNumber: 0
        };

        this.onOptionClicked = this.onOptionClicked.bind(this);
        this.changeTurn = this.changeTurn.bind(this);
        this.checkWinner = this.checkWinner.bind(this);
    }

    onOptionClicked(positionX, positionY) {
        let updatedMatrix = this.state.currentMatrix;
        updatedMatrix[positionX][positionY] = this.state.currentTurnLabel;

        this.setState({currentMatrix: updatedMatrix, turnNumber: ++this.state.turnNumber}, () => {
            this.checkWinner();
        });
    }

    checkWinner() {
        let lines = matrixUtils.getAllLines(this.state.currentMatrix);
        let winnerLine = lines.find(line => /(.)\1\1/.test(line));

        if (winnerLine) {
            let winnerMessage = winnerLine.includes(LABEL_X) ? MESSAGE_PLAYER_ONE_WINNER : MESSAGE_PLAYER_TWO_WINNER;
            this.setState({message: winnerMessage});
        } else {
            if (this.state.turnNumber === 9) {
                this.setState({message: MESSAGE_DRAW});
            }
            this.changeTurn();
        }
    }

    changeTurn() {
        let nextTurnLabel = this.state.currentTurnLabel === LABEL_X ? LABEL_O : LABEL_X;
        this.setState({currentTurnLabel: nextTurnLabel});
    }

    render() {
        let winnerBackground = this.state.message ?
            <WinnerBackgroundComponent message={this.state.message}></WinnerBackgroundComponent> : "";

        return (
            <Row>
                <Col md={8} mdOffset={2}>
                    <OptionComponent onClick={this.onOptionClicked} positionX={0} positionY={0}
                                     label={this.state.currentTurnLabel}></OptionComponent>
                    <OptionComponent onClick={this.onOptionClicked} positionX={0} positionY={1}
                                     label={this.state.currentTurnLabel}></OptionComponent>
                    <OptionComponent onClick={this.onOptionClicked} positionX={0} positionY={2}
                                     label={this.state.currentTurnLabel}></OptionComponent>
                    <OptionComponent onClick={this.onOptionClicked} positionX={1} positionY={0}
                                     label={this.state.currentTurnLabel}></OptionComponent>
                    <OptionComponent onClick={this.onOptionClicked} positionX={1} positionY={1}
                                     label={this.state.currentTurnLabel}></OptionComponent>
                    <OptionComponent onClick={this.onOptionClicked} positionX={1} positionY={2}
                                     label={this.state.currentTurnLabel}></OptionComponent>
                    <OptionComponent onClick={this.onOptionClicked} positionX={2} positionY={0}
                                     label={this.state.currentTurnLabel}></OptionComponent>
                    <OptionComponent onClick={this.onOptionClicked} positionX={2} positionY={1}
                                     label={this.state.currentTurnLabel}></OptionComponent>
                    <OptionComponent onClick={this.onOptionClicked} positionX={2} positionY={2}
                                     label={this.state.currentTurnLabel}></OptionComponent>
                </Col>
                {winnerBackground}
            </Row>
        )
    }
}

export default TicTacToeComponent;