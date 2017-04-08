import React from 'react';
import {Row, Col, Button, Glyphicon} from 'react-bootstrap';

import matrixUtils from '../../utils/matrix-utils';
import iaTicTacToeUtils from '../../utils/ia-tic-tac-toe-utils';

import OptionComponent from './option/OptionComponent';
import WinnerBackgroundComponent from './winner/WinnerBackgroundComponent';
import ChooseOpponentModalComponent from './modal/ChooseOpponentModalComponent';

const LABEL_X = "X";
const LABEL_O = "O";

// Messages
const MESSAGE_PLAYER_ONE_WINNER = "Player 1 is the Winner!";
const MESSAGE_PLAYER_TWO_WINNER = "Player 2 is the Winner!";
const MESSAGE_IA_WINNER = "Computer is the Winner!";
const MESSAGE_DRAW = "DRAW!";

class TicTacToeComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentTurnLabel: LABEL_X,
            currentMatrix: matrixUtils.getEmptyMatrix(),
            turnNumber: 0,
            showStartModal: true
        };

        this.clickOption = this.clickOption.bind(this);
        this.changeTurn = this.changeTurn.bind(this);
        this.checkWinner = this.checkWinner.bind(this);
        this.selectIaPosition = this.selectIaPosition.bind(this);
        this.chooseOpponent = this.chooseOpponent.bind(this);
        this.restart = this.restart.bind(this);
    }

    clickOption(positionX, positionY) {
        let updatedMatrix = this.state.currentMatrix;
        updatedMatrix[positionX][positionY] = this.state.currentTurnLabel;

        this.setState({currentMatrix: updatedMatrix, turnNumber: ++this.state.turnNumber}, () => {
            this.checkWinner();
        });
    }

    checkWinner() {
        let lines = matrixUtils.getAllLines(this.state.currentMatrix);
        let winnerLine = lines.find(line => {
            let charactersLine = line.map(element => element.char).join("");
            return /(.)\1\1/.test(charactersLine);
        });

        if (winnerLine) {
            let winnerMessage = winnerLine.includes(LABEL_X) ? MESSAGE_PLAYER_ONE_WINNER : (this.state.iaPlaying ? MESSAGE_IA_WINNER : MESSAGE_PLAYER_TWO_WINNER);
            this.setState({message: winnerMessage});
        } else {
            if (this.state.turnNumber === 9) {
                this.setState({message: MESSAGE_DRAW});
            } else {
                this.changeTurn();
            }
        }
    }

    changeTurn() {
        let nextTurnLabel = this.state.currentTurnLabel === LABEL_X ? LABEL_O : LABEL_X;
        this.setState({currentTurnLabel: nextTurnLabel}, () => {
            if (this.state.iaPlaying && this.state.currentTurnLabel === LABEL_O) {
                this.selectIaPosition();
            }
        });
    }

    selectIaPosition() {
        let position = iaTicTacToeUtils.getNextPosition(this.state.currentMatrix, LABEL_X, LABEL_O);
        console.log(position);
        this.clickOption(position.x, position.y);
    }

    chooseOpponent(isIaOpponent) {
        this.setState({
            showStartModal: false,
            iaPlaying: isIaOpponent
        })
    }

    restart() {
        this.setState({
            currentTurnLabel: LABEL_X,
            currentMatrix: matrixUtils.getEmptyMatrix(),
            turnNumber: 0,
            showStartModal: true,
            message: ""
        });
    }

    render() {
        let restartButton = <Button onClick={this.restart} className="btn-info action-button"><Glyphicon
            glyph="refresh"/></Button>;

        let winnerBackground = this.state.message ?
            <WinnerBackgroundComponent message={this.state.message}
                                       restartButton={restartButton}></WinnerBackgroundComponent> : "";

        return (
            <Row>
                <Col md={8} mdOffset={2}>
                    {
                        this.state.currentMatrix.map((lines, xIndex) => lines.map((label, yIndex) => {
                                return (
                                    <OptionComponent onClick={this.clickOption} positionX={xIndex} positionY={yIndex}
                                                     label={label}></OptionComponent>
                                )
                            })
                        )
                    }
                </Col>
                <Col md={2}>
                    {restartButton}
                </Col>
                {winnerBackground}
                <ChooseOpponentModalComponent showModal={this.state.showStartModal}
                                              chooseOpponent={this.chooseOpponent}></ChooseOpponentModalComponent>
            </Row>
        )
    }
}

export default TicTacToeComponent;