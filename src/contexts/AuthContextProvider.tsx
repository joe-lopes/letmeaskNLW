import { Children, ReactNode, createContext, useEffect, useState } from "react";
import { firebase, auth } from "../services/firebase";

export const AuthContext = createContext({} as AuthContextType);

type User = {
    id: string,
    name: string,
    avatar: string
}
  
type AuthContextType = { 
    user: User | undefined,
    loginWithGoogle : () => Promise<void>
};

type AuthContextProviderProps = {
    children : ReactNode
}

export function AuthContextProvider(props : AuthContextProviderProps) {

    useEffect(() =>{

        const unsubscribe = auth.onAuthStateChanged(user =>{
    
          if (user){
            
            const {displayName, photoURL, uid} = user;
          
            if(!displayName || !uid || !photoURL){
    
              throw new Error("Usuário sem nome ou sem ID")
      
            }
    
            setUser({
              id: uid, 
              name: displayName,
              avatar: photoURL
            })
          }
    
        })
    
        return () => {
          
          unsubscribe();
        
        }
        
      }, []);
    
      const [user, setUser] = useState<User>();
    
      async function loginWithGoogle(){
        
        const provider = new firebase.auth.GoogleAuthProvider();
      
        const result = await auth.signInWithPopup(provider);
    
          if (result.user){
            
            const {displayName, photoURL, uid} = result.user;
          
            if(!displayName || !uid || !photoURL){
    
              throw new Error("Usuário sem nome ou sem ID")
      
            }
    
            setUser({
              id: uid, 
              name: displayName,
              avatar: photoURL
            })
          }
      }

    return(
        <AuthContext.Provider value={{user, loginWithGoogle}}>
            {props.children}
        </AuthContext.Provider>
    )
}