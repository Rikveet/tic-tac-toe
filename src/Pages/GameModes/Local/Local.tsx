import React, {useState} from 'react';
import Board from "../../../components/GameBoard/Board";
import Form from "../Form/Form";

const Local = () => {
    const [isFormFilled, setFormFilled] = useState(false);
    const [playerName, setPlayerName] = useState('Player 1');
    const [opponentName, setOpponentName] = useState('Player 2');
    return (
        <div className={'main'}>
        {isFormFilled ?
            <div>
                <Board size={3} />
            </div>
            :
            <Form
                gameType={{type:'local', setON:setOpponentName}}
                setPN={setPlayerName}
                formCompleted={setFormFilled}/>
        }
        </div>
    );
};

export default Local;