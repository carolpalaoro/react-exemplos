import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(square => square !== null);

  const handleClick = (i) => {
    if (squares[i] || winner || isBoardFull) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div>
      <div className="status">
        Status:{" "}
        <br/>
        {winner ? (
            // Melhoria: mostrar o nome do vencedor
          <p className="winner">O vencedor é: {xIsNext ? "Jogador 2" : "Jogador 1"}!</p>
        ) : isBoardFull ? (
            // Melhoria: mensagem alertando o empate ou vitória
          <p className="draw">Deu velha!</p>
        ) : (
          `Próximo a jogar: ${xIsNext ? "Jogador 1" : "Jogador 2"}`
        )}
      </div>
      {!winner && !isBoardFull && (
        <div>
          <div className="board-row">
            {[0, 1, 2].map((i) => (
              <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
            ))}
          </div>
          <div className="board-row">
            {[3, 4, 5].map((i) => (
              <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
            ))}
          </div>
          <div className="board-row">
            {[6, 7, 8].map((i) => (
              <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
            ))}
          </div>
        </div>
      )}
      {(winner || isBoardFull) && (
        <div>
          <p>Para reiniciar o jogo, clique no botão abaixo:</p>
          <button className="reset-button" onClick={restartGame}>
            Reiniciar Jogo
          </button>
        </div>
      )}
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default Board;