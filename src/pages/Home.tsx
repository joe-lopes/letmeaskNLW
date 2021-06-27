import wallPaper from '../assets/illustration.svg';
import logo from '../assets/logo.svg';
import googleIcon from '../assets/google-icon.svg';
import {Button} from '../components/Button';
import '../styles/auth.scss';
import '../styles/button.scss';
import {useHistory} from 'react-router-dom'
import {firebase, auth, database} from '../services/firebase';
import { UseAuth } from '../hooks/UseAuth';
import { FormEvent } from 'react';
import { useState } from 'react';


export function Home(){

    let history = useHistory();

    const {user, loginWithGoogle} = UseAuth();

    async function navigateToNewRoom() {

        if(!user){

            await loginWithGoogle();
        }
        
        history.push('/rooms/new')
    
    }

    const [roomID, setRoomID] = useState('');

    async function handleJoinRoom(event : FormEvent) {
        
        event.preventDefault();

        console.log(roomID);

        if(roomID.trim() === " "){ return };

        const rooms = await database.ref(`rooms/${roomID}`).get();

        if(!rooms.exists()){ 
            alert('Room does not exists')
            return;
        };

        history.push(`/rooms/${roomID}`)
        
    }
    
    return  <div id="page-auth">
                <aside>
                    <img src={wallPaper} alt="" />
                    <strong>Um simples texto de teste</strong>
                    <p>Um simples texto de teste. Um simples texto de teste</p>
                </aside>

                <main>
                    <div className="main-content">
                        <img src={logo} alt="" />
                        <button className="create-room" onClick={navigateToNewRoom}> <img src={googleIcon} alt="" />Entre na sala com Google</button>
                        <div className="separator">Ou entre numa sala</div>
                        <form 
                            onSubmit={handleJoinRoom}
                        >
                            <input
                                type="text"
                                placeholder="Nome da sala"
                                onChange={event=>{
                                    setRoomID(event.target.value)
                                }}
                                value={roomID}
                            />
                            <Button type="submit">Entrar na sala</Button>
                        </form>
                    </div>
                </main>
            </div>
}