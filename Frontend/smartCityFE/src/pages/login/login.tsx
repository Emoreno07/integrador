import { ChangeEvent, useEffect, useState } from 'react'
import { logUser, verifyCredentials } from '../../services/loginService';
import styles from './login.module.css'
import { json, useNavigate } from 'react-router-dom';
import { Token } from '../../utils/types';
import { useCookies } from 'react-cookie';

export default function Login(){
    const [cookies,setCookies,removeCookies] = useCookies()
    const nav = useNavigate();
    const [user , setUser]= useState('');
    const [pass , setPass]= useState('');
    const [email, setEmail] = useState('');
    const [token,setToken] = useState<string>();
    const handleChange = (e : ChangeEvent) =>{
        e.stopPropagation();
        const id = e.currentTarget.getAttribute('id');
        const input = e.currentTarget as HTMLInputElement;
        if(id == 'user'){
            setUser(input.value);
        }
        else if(id == 'email'){
            setEmail(input.value);
        }
        else{
            setPass(input.value);
        }
    }
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
                <input id='user' className={`${styles['input']}`} type="text" required={true} placeholder='meu usuario' onChange={handleChange}/>

                <h2 className={`${styles['h2']}`}>Email</h2>
                <input id='email' className={`${styles['input']}`} type="email" required={true} placeholder='example@example.com' onChange={handleChange}/>

                <h2 className={`${styles['h2']}`}>Senha</h2>             
                <input id='senha' className={`${styles['input']}`} type="password" required={true} placeholder='minha senha' onChange={handleChange}/>     
                <button onClick={(e) => {
                    logUser(user,email,pass, e)
                    .then(data => {
                        const verification = verifyCredentials(data)
                            if(typeof(verification) === 'string'){
                                alert(verification)
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