import { loginSchema, Token, cadastroSchema} from "../utils/types";
import {MouseEvent} from "react";

export async function logUser(user: string, password: string, e : MouseEvent<any,any>) : Promise<Token | number>{
    e.stopPropagation();
    e.preventDefault();
    const infoUser : loginSchema ={
        username: user,
        password: password
    }
    const token = await fetch('http://localhost:8000/api/token/',
        {
            headers:{
                'Content-Type' : 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(infoUser)
        }
    )
    //caso a operação não dê certo, manda o status do token
    if(token.status === 200){
        const data : Token = await token.json();
        return data
    }
    else{
        return token.status
    }
    
}
export function verifyCredentials(token : number | Token) : string | Token{
    //verifica se o servidor retornou um status diferente de 200
    if(typeof(token) === 'number'){
        return ( token === 400 || token === 401) ? 'Usuario ou senha invalidos!'  : 'something went wrong, code: ' + token
    }
    else{
        return token
    }
}
export async function getAccessByRefresh(refreshToken: string): Promise<[boolean, string | undefined]>{
    //como boa pratica de não colocar usuário e senha no navegador, decidi colocar o refresh do token e que seja gerado um access que fica como variavel
    const req = await fetch('http://127.0.0.1:8000/api/token/refresh/',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            refresh: refreshToken
        })
    })
    const token: Token = await req.json()
    if(!token) return [false, ''];
    //verifica se o token gerado está autorizado a consumir a API
    const logged = await fetch('http://127.0.0.1:8000/api/sensores/', {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + token.access
        }
    })
    //caso não esteja autorizado. em caso de expansão de hierarquia de accesso.
    return [logged.status !== 401, token.access];
    

}

export async function createUser(user: string, password: string, email: string) : Promise<string>{
    const infoUser : cadastroSchema = {
        username : user,
        password : password,
        email : email
    }
    const request = await fetch('http://localhost:8000/api/create_user/',
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(infoUser)
            }
        )  
    if(request.status === 201){
        return 'cadastrado com sucesso'
    }
    else if(request.status === 400){
        const data = await request.json()
        return data?.email || data?.username || data?.password
    }
    else{
        return 'oops. Code: ' + request.status
    }
}