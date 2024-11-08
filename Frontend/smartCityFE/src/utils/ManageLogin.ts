import { loginSchema, Token } from "./types";
import { MouseEvent } from "react";
import { json, useNavigate } from "react-router-dom";
export async function logUser(user: string, password: string, email: string, e : MouseEvent<any,any>) : Promise<Token |undefined>{
    e.preventDefault();
    e.stopPropagation();
    const loginUser : loginSchema = {
        username: user,
        password: password,
    }
    const token = await fetch('http://127.0.0.1:8000/api/token/',
        {
            headers:{
                'Content-Type' : 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(loginUser)
        }
    )
    if(token.status === 200){
        const data = await token.json();
        return data
    }
    else{
        return undefined
    }
    
}

export async function useIsAuthenticated(token: string | undefined | null): Promise<boolean>{
    if(!token) return false;
    const logged = await fetch('http://127.0.0.1:8000/api/sensores/', {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    })
    console.log(await logged.json())
    return logged.status !== 401;
    

}