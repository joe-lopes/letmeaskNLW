import { ButtonHTMLAttributes, FormEvent, Provider } from 'react';
import logoImg from '../assets/logo.svg';
import deleteImg from '../assets/delete.svg';
import { Button } from '../components/Button';
import '../styles/rooms.scss';
import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router';
import { useState } from 'react';
import { auth, database } from '../services/firebase';
import { UseAuth } from '../hooks/UseAuth';
import { useEffect } from 'react';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom'
import { stringify } from 'querystring';
import {useHistory} from 'react-router-dom';
import checkImg from '../assets/check.svg';
import answerImg from '../assets/answer.svg';

type UseParamsProps = {
    id: string;
}


export function AdminRoom() {

    
    const {user} = UseAuth()
    const params = useParams<UseParamsProps>();
    const roomId = params.id;
    const [question, setQuestion] = useState(''); 
    const {questions, title} = useRoom(roomId);
    const history = useHistory();

    

    async function handleEndRoom() {

        await database.ref(`/rooms/${roomId}`).update({
            endedAt: new Date()
        });

        history.push('/');
        
    }

    async function handleDeleteQuestion(questionId : string){

        if(window.confirm('Você quer mesmo deletar essa pergunta?')){
            
            await database.ref(`/rooms/${roomId}/question/${questionId}`).remove();
        }

    }

    async function handleSendQuestion(event : FormEvent){
        event.preventDefault();
        if(question === " "){
            return
        }
        
        const questionUnite = {
            content: question,
            author: {
                name: user?.name,
                avatar: user?.avatar
            },
            isHighlighted : false,
            isAnswered : false

        }

        await database.ref(`rooms/${roomId}/question`).push(questionUnite);
        setQuestion('');
    }

    async function handleCheckQuestionAsAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/question/${questionId}`).update({
            isAnswered : true
        });
    }
    
    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/question/${questionId}`).update({
            isHighlighted : true
        });
    }
    
    return (
        
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask"/>
                    <div>
                        <RoomCode roomCode={roomId}/>
                        <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                    
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key = {question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >
                                {!question.isAnswered && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleCheckQuestionAsAnswered(question.id)}
                                        >                                   
                                            <img src={checkImg} alt="marcar pergunta com respondida" />

                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >                                   
                                            <img src={answerImg} alt="dar destaque à pergunta" />

                                        </button>
                                    </>
                                )}

                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >                                   
                                    <img src={deleteImg} alt="delete" />

                                </button>
                            </Question>

                        )
                    })};
                </div>
            </main>           
        </div>

    )
    
}