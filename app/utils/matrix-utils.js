const ValidationUtils = (() => {

    /* Get all possible lines in a matrix of tic-tac-toe */
    function getAllLines(matrix) {
        var lines = [];
        for (let xIndex in matrix) {
            lines.push(matrix[xIndex].join("")); // Horizontal Lines
        }

        for (let yIndex in matrix) {
            let yLine = "";
            for (let xIndex in matrix) {
                yLine += matrix[xIndex][yIndex];
            }
            lines.push(yLine); // Vertical Lines
        }

        let crossLineOne = matrix[0][0] + matrix[1][1] + matrix[2][2];
        lines.push(crossLineOne);
        let crossLineTwo = matrix[0][2] + matrix[1][1] + matrix[2][0];
        lines.push(crossLineTwo);

        return lines;
    }

    return {
        getAllLines: getAllLines
    }
})();

export default ValidationUtils;