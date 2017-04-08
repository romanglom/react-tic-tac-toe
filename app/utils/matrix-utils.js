const EMPTY = "";
const ValidationUtils = (() => {

    /* Get all possible lines in a matrix of tic-tac-toe and each character position */
    function getAllLines(matrix) {
        var lines = [];
        for (let xIndex in matrix) {
            let xLine = [];
            for (let yIndex in matrix) {
                let charLine = getCharLine(matrix, xIndex, yIndex);
                xLine.push(charLine);
            }
            lines.push(xLine); // Horizontal Lines
        }

        for (let yIndex in matrix) {
            let yLine = [];
            for (let xIndex in matrix) {
                let charLine = getCharLine(matrix, xIndex, yIndex);
                yLine.push(charLine)
            }
            lines.push(yLine); // Vertical Lines
        }

        let crossLineOne = [
            getCharLine(matrix, 0, 0),
            getCharLine(matrix, 1, 1),
            getCharLine(matrix, 2, 2)
        ];
        lines.push(crossLineOne);

        let crossLineTwo = [
            getCharLine(matrix, 0, 2),
            getCharLine(matrix, 1, 1),
            getCharLine(matrix, 2, 0)
        ];
        lines.push(crossLineTwo);

        return lines;
    }

    function getCharLine(matrix, xIndex, yIndex) {
        return {
            char: matrix[xIndex][yIndex],
            position: {x: xIndex, y: yIndex}
        }
    }

    function getEmptyMatrix(){
        return [[EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY], [EMPTY, EMPTY, EMPTY]];
    }

    return {
        getAllLines: getAllLines,
        getEmptyMatrix: getEmptyMatrix
    }
})();

export default ValidationUtils;