import React from 'react'
import './App.scss';
import { FaTrophy, FaSadCry } from 'react-icons/fa';


function Gameoverlay({ onClickNewGame, overlay, onClickKeepGoing }) {

    const overlayPicker = () => {
        if (overlay === 'playing') {
            return 'gameoverlay__none'
        } if (overlay === ('win' || 'gameover')) {
            return 'gameoverlay'
        }
    }

    return (
        <div className={overlayPicker()}>
            {overlay === 'win' &&
                <div>
                    <h1 className="gameoverlay__message">You Win!<FaTrophy color="yellow" fontSize="50px" /> </h1>
                    <button className="gameoverlay__button" onClick={onClickKeepGoing}>Keep Going!</button>
                </div>}
            {overlay === 'gameover' &&
                <div>
                    <h1 className="gameoverlay__message">GAME OVER!<FaSadCry color="yellow" fontSize="50px" /></h1>
                    <button className="gameoverlay__button" onClick={onClickNewGame}>Try again!</button>
                </div>}

        </div>
    )
}

export default Gameoverlay

