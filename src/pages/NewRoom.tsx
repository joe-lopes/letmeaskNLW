import wallPaper from '../assets/illustration.svg';
import logo from '../assets/logo.svg';
import googleIcon from '../assets/google-icon.svg';
import {Button} from '../components/Button';
import '../styles/auth.scss';
import '../styles/button.scss';
import {Link, useHistory} from 'react-router-dom';
import {UseAuth} from '../hooks/UseAuth';
import {FormEvent} from 'react';
import {useState} from 'react';
import { database } from '../services/firebase';
import { async } from 'q';
import { RoomCode } from '../components/RoomCode';

export function NewRoom(){

    const {user} = UseAuth();

    const [newRoom, setNewRoom] = useState('');

    const history = useHistory();

    async function navigateToNewRoom(event: FormEvent){
        
        event.preventDefault();
        
        console.log(newRoom);

        if(newRoom.trim() === " "){return};

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            roomName: newRoom,
            authorID: user?.id
        });


        history.push(`/rooms/${firebaseRoom.key}`);
        
    }
    

    return  (
        <div id="page-auth">
            <aside>
                <img src={wallPaper} alt="" />
                <strong>Um simples texto de teste</strong>
                <p>Um simples texto de teste. Um simples texto de teste</p>
            </aside>

            <main>               
                <div className="main-content">
                    <img src={logo} alt="" />
                    <br/>
                    <h1>{user?.name}</h1>
                    <h2>Criar um nova sala</h2>
                    
                    <form 
                        onSubmit ={navigateToNewRoom}
                    >
                        <input
                            type="text"
                            onChange ={event => {setNewRoom(event.target.value)}}
                            value={newRoom}
                            placeholder="Nome da sala"
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}