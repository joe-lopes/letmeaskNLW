import {useContext} from "react";
import { AuthContext } from "../contexts/AuthContextProvider";

export function UseAuth(){

    const value = useContext(AuthContext);

    return value;

}