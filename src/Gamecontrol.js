import React from 'react';
import { FaPlay } from "react-icons/fa";
import { ImRedo2, ImUndo2 } from "react-icons/im"

function Gamecontrol({ onUndo, onRedo, onReplay, disableUndo, disableRedo, disableReplay }) {
    return (
        <div className="gamecontrol">
            <div className="gamecontrol__play" style={{ opacity: !disableUndo ? 1 : 0.4 }}>
                <ImUndo2 className={
                    !disableUndo
                        ? 'gamecontrol__button'
                        : 'gamecontrol__button--disabled'}
                    color='white'
                    fontSize='90px'
                    onClick={!disableUndo ? onUndo : () => { }} />
                    Undo
            </div>
            <div className="gamecontrol__play" style={{ opacity: !disableReplay ? 1 : 0.4 }}>
                <FaPlay className={
                    !disableReplay
                        ? 'gamecontrol__button'
                        : 'gamecontrol__button--disabled'}
                    color='white'
                    fontSize='80px'
                    onClick={!disableReplay ? onReplay : () => { }} />
                    Replay
            </div>
            <div className="gamecontrol__play" style={{ opacity: !disableRedo ? 1 : 0.4 }}>
                <ImRedo2 className={
                    !disableRedo
                        ? 'gamecontrol__button'
                        : 'gamecontrol__button--disabled'}
                    color='white'
                    fontSize='90px'
                    onClick={!disableRedo ? onRedo : () => { }} />
                    Redo
            </div>
        </div>
    )
}

export default Gamecontrol
