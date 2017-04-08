import matrixUtils from './matrix-utils';

const EMPTY = "";

/* It's not the best, but a simple IA solution for tic-tac-toe */
const IaTicTacToeUtils = (() => {

    function getNextPosition(matrix, enemyCharacter, iaCharacter) {
        var onlyOneCharacterLeftForEnemyRegex = new RegExp("(" + enemyCharacter + ")\\1");
        var onlyOneCharacterForIaRegex = new RegExp("(" + iaCharacter + ")\\1");
        let lines = matrixUtils.getAllLines(matrix);

        let bestNextPosition;
        let possibleNextPositions = [];
        for (let line of lines) {
            let freePosition = findFreePosition(line);

            let charactersLine = line.map(element => element.char).join("");
            if (freePosition && onlyOneCharacterLeftForEnemyRegex.test(charactersLine)) {
                bestNextPosition = freePosition;
                break;
            }

            if (freePosition && onlyOneCharacterForIaRegex.test(charactersLine)) {
                bestNextPosition = freePosition;
                break;
            }

            if (freePosition) {
                possibleNextPositions.push(freePosition);
            }
        }

        var randomFreePosition = Math.floor(Math.random() * possibleNextPositions.length);
        return bestNextPosition ? bestNextPosition : possibleNextPositions[randomFreePosition];
    }

    function findFreePosition(line) {
        let elementFound = line.find(element => element.char === EMPTY);
        if (elementFound) {
            return elementFound.position;
        }
    }

    return {
        getNextPosition: getNextPosition
    }

})
();

export default IaTicTacToeUtils;