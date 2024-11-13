import { loginSchema, Token } from "./types";
import { MouseEvent } from "react";
import { json, useNavigate } from "react-router-dom";
export async function logUser(user: string, email: string, password: string, e : MouseEvent<any,any>) : Promise<Token |undefined>{
    e.preventDefault();
    e.stopPropagation();
    const loginUser : loginSchema = {
        username: user,
        password: password,
    }
    const token = await fetch('http://localhost:8000/api/token/',
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
        return data.access
    }
    else{
        return undefined
    }
    
}

export async function useIsAuthenticated(refreshToken: string | undefined | null): Promise<[boolean, string | undefined]>{

    const req = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            access: refreshToken
        })
    })
    const token: Token = await req.json()
    if(!token) return [false, ''];
    const logged = await fetch('http://127.0.0.1:8000/api/sensores/', {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + token.access
        }
    })
    return [logged.status !== 401, token.access];
    

}