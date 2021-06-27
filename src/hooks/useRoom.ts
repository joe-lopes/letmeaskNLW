import { link } from "fs";
import { useEffect, useState } from "react";
import { isCallLikeExpression } from "typescript";
import {database, auth, firebase} from "../services/firebase"
import { UseAuth } from "./UseAuth";


type FirebaseQuestions = Record<string, {
    author: {
        avatar: string, 
        name: string
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean 
    likes: Record<string, {
        authorId: string
    }>
}>

type QuestionType = {
    id: string,
    author: {
        avatar: string, 
        name: string
    }
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean,
    likeCount: number,
    likeId: string | undefined
}

export function useRoom(roomId: string){
    const {user} = UseAuth();
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(()=>{

        
        const roomRef = database.ref(`/rooms/${roomId}`);

        console.log(roomRef);

        roomRef.on('value', room => {
            
            const roomValues = room.val();

            const firebaseQuestions: FirebaseQuestions = roomValues.question ?? {};

            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {

                return {
                    id: key,
                    author: {
                        avatar: value.author.avatar, 
                        name: value.author.name
                    },
                    content: value.content,
                    isAnswered: value.isAnswered,
                    isHighlighted: value.isHighlighted,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, liked]) => liked.authorId === user?.id)?.[0]
                    //likeId: Object.entries(value.likes ?? {}).forEach(element =>{})
                }
            });

            setTitle(roomValues.roomName)
            setQuestions(parsedQuestions);

        })

        return () => {
            roomRef.off('value')
        }

    }, [roomId, user?.id])

    return {questions, title}

}