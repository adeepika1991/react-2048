import React from 'react';
import './App.scss';


const pickColour = (num) => {
    switch (num) {
        case 2: return '#eee4da';
        case 4: return '#ede0c8';
        case 8: return '#f2b179';
        case 16: return '#f59563';
        case 32: return '#f67c5f';
        case 64: return ' #f65e3b';
        case 128: return '#edcf72';
        case 256: return '#edcc61';
        case 512: return '#edc850';
        case 1024: return '#edc53f';
        case 2048: return '#edc22e';
        default: return '#C2B3A3';
    }
}

function Tile({ num }) {
    return (
        <div
            className='tile'
            style={{
                background: pickColour(num),
                color: num === 2 || num === 4 ? "#645B52" : "#F7F4EF",
                fontSize: num > 512 ? '35px' : '45px',
            }}
        >
            {num ? num : ''}
        </div>
    )
}

export default Tile
