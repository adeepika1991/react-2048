import React from 'react';
import Tile from './Tile';
import './App.scss';

function Board({ data, score, best, onClickNewGame, initBoard }) {
    return (
        <div className="board">
            <div className='game'>
                <div className='game-group'>
                    <h1 className='game-title'>2048</h1>
                    <div className='game-score-container'>
                        <div className='game-score-box'>
                            <span className='game-score-box--current'>SCORE</span>
                            <span>{score}</span>
                        </div>
                        <div className='game-score-box'>
                            <span className='game-score-box--best'>BEST</span>
                            <span>{best}</span>
                        </div>
                        <button className='game-refresh' onClick={onClickNewGame}>
                            New Game
                        </button>
                    </div>
                </div>
                <div className='game-group'>
                    <p>Join the number and get to the 2048 tile!</p>
                </div>
            </div>
            <div className='board-body'>
                {data.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className='board-row'>
                            {row.map((num, index) => (
                                <Tile num={num} key={index} />
                            ))}
                        </div>
                    );
                })}
            </div>

        </div>
    )
}

export default Board
