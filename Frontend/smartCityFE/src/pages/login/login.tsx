import { useEffect, useState } from 'react'
import {logUser, verifyCredentials } from '../../services/loginService';
import styles from './login.module.css'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { handleFormStateInput } from '../../utils/inputEvent';

export default function Login(){
    const [cookies,setCookies,removeCookies] = useCookies()
    const nav = useNavigate();
    const [user , setUser]= useState('');
    const [pass , setPass]= useState('');
    const [token,setToken] = useState<string>();
    const [error, setError] = useState<string>('')
    useEffect(() =>{
        if(token){
            setCookies('refreshToken',token)
            nav('/')
        }
        return () => {}
    },[token]) 
    return (
        <main className="flex-container flex-center">
            <form className={`flex-container flex-center flex-column ${styles['section']}`}>
                <h1>LOGIN</h1>
                <h2 className={`${styles['h2']}`}>Usuário</h2>
                <input id='user' className={`${styles['input']}`} type="text" required={true} placeholder='meu usuario' onChange={handleFormStateInput(setUser)}/>
                <h2 className={`${styles['h2']}`}>Senha</h2>    
                <input id='senha' className={`${styles['input']}`} type="password" required={true} placeholder='minha senha' onChange={handleFormStateInput(setPass)}/>        
                  
                <span>Não tem um Login? <a href='/cadastro'>cadastre-se</a></span>
                <span>{error}</span> 
                <button onClick={(e) => {
                    logUser(user,pass, e)
                    .then(data => {
                        const verification = verifyCredentials(data)
                            if(typeof(verification) === 'string'){
                                setTimeout(() =>{
                                    setError("")
                                }, 3000)
                                setError(verification)
                            }
                            else{
                                setToken(verification.refresh)
                            }
                    })
                }} type="submit" id='button-login'>Entrar</button>
            </form>
        </main>
    )
}