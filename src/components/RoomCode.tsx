

import copyImg from '../assets/copy.svg';
import '../styles/room-code.scss';

type RoomCodeProps = {
    roomCode : string;
}

export function RoomCode(props : RoomCodeProps) {


    function copyRoomCodeToClipboard() {
    
        navigator.clipboard.writeText(props.roomCode);
    }

    return(
        <button onClick={copyRoomCodeToClipboard} className="room-code">
            <div>
                <img src={copyImg} alt="Copy Room Code" />
            </div>
            <span>{props.roomCode}</span>
        </button>
    )
    
}