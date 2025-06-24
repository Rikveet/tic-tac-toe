function getBestMove({boardState, difficulty, aiMark, isVanishing}) {
    const opponentMark = aiMark === "X" ? "O" : "X"

    function getAvailableMoves() {
        return boardState
            .map((cell, index) => cell.value === null ? index : -1)
            .filter(index => index !== -1)
    }

    const availableMoves = getAvailableMoves()

    if (availableMoves.length === 0) return -1


    function getRandomMove(availableMoves) {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)]
    }

    function getMediumMove(availableMoves) {
        if (Math.random() < 0.7) {
            const strategicMove = getStrategicMove(availableMoves)
            if (strategicMove !== -1) return strategicMove
        }
        return getRandomMove(availableMoves)
    }

    function getHardMove(availableMoves) {
        const bestMove = minimax(boardState, 0, true)
        return bestMove.position
    }

    function getStrategicMove(availableMoves) {
        // Check for winning move
        for (const move of availableMoves) {
            if (isWinningMove(move, aiMark)) {
                return move
            }
        }

        // Check for blocking opponent's winning move
        for (const move of availableMoves) {
            if (isWinningMove(move, opponentMark)) {
                return move
            }
        }

        // Take center if available
        if (availableMoves.includes(4)) {
            return 4
        }

        // Take corners
        const corners = [0, 2, 6, 8].filter(pos => availableMoves.includes(pos))
        if (corners.length > 0) {
            return corners[Math.floor(Math.random() * corners.length)]
        }

        return -1
    }

    function isWinningMove(position, mark) {
        const testBoard = [...boardState]
        testBoard[position] = {value: mark === "X" ? 1 : 0, placedAtMoveNum: 0}
        return checkWin(testBoard, mark)
    }

    function checkWin(board, mark) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ]

        const markValue = mark === "X" ? 1 : 0

        return winPatterns.some(pattern =>
            pattern.every(pos => board[pos].value === markValue)
        )
    }

    function getBoardAfterVanish(board, moveNum) {
        const newBoard = board.map(cell => ({...cell})) // copy

        let oldestCell = {index: -1, age: 0}

        newBoard.forEach((cell, index) => {
            if (cell.value !== null && cell.placedAtMoveNum !== -1) {
                const age = moveNum - cell.placedAtMoveNum
                if (age > 5 && age > oldestCell.age) {
                    oldestCell = {index, age}
                }
            }
        })

        if (oldestCell.index !== -1 && oldestCell.age > 5) {
            newBoard[oldestCell.index] = {
                placedAtMoveNum: -1,
                value: null
            }
        }

        return newBoard
    }

    function minimax(_board, depth, isMaximizing) {

        const board = isVanishing ? getBoardAfterVanish(_board, isVanishing.movesDone + depth) : _board

        const availableMoves = board
            .map((cell, index) => cell.value === null ? index : -1)
            .filter(index => index !== -1)

        // Check terminal states
        if (checkWin(board, aiMark)) return {score: 10 - depth, position: -1}
        if (checkWin(board, opponentMark)) return {score: depth - 10, position: -1}
        if (availableMoves.length === 0 || (isVanishing && depth === 10)) return {score: 0, position: -1}

        if (isMaximizing) {
            let bestScore = -Infinity
            let bestMove = -1

            for (const move of availableMoves) {
                const newBoard = [...board]
                newBoard[move] = {
                    value: aiMark === "X" ? 1 : 0,
                    placedAtMoveNum: isVanishing ? isVanishing.movesDone + depth + 1 : 0
                }

                const result = minimax(newBoard, depth + 1, false)

                if (result.score > bestScore) {
                    bestScore = result.score
                    bestMove = move
                }
            }

            return {score: bestScore, position: bestMove}
        } else {
            let bestScore = Infinity
            let bestMove = -1

            for (const move of availableMoves) {
                const newBoard = [...board]
                newBoard[move] = {
                    value: opponentMark === "X" ? 1 : 0,
                    placedAtMoveNum: isVanishing ? isVanishing.movesDone + depth + 1 : 0
                }

                const result = minimax(newBoard, depth + 1, true)

                if (result.score < bestScore) {
                    bestScore = result.score
                    bestMove = move
                }
            }

            return {score: bestScore, position: bestMove}
        }
    }

    switch (difficulty) {
        case "EASY":
            return getRandomMove(availableMoves)
        case "MEDIUM":
            return getMediumMove(availableMoves)
        case "HARD":
            return getHardMove(availableMoves)
        default:
            return getRandomMove(availableMoves)
    }
}
