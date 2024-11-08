import { ChangeEvent, useState } from 'react'
import { logUser } from '../../utils/ManageLogin';
import styles from './login.module.css'
import { json, useNavigate } from 'react-router-dom';
import { Token } from '../../utils/types';

export default function Login(){
    const nav = useNavigate();
    const [user , setUser]= useState('');
    const [pass , setPass]= useState('');
    const [email, setEmail] = useState('');
    const [token,setToken] = useState<Token>();
    if(token){
        localStorage.setItem('token',JSON.stringify(token));
        nav('/')
    }
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
                <button onClick={(e) => logUser(user,email,pass, e).then(data => setToken(data))} type="submit" id='button-login'>Entrar</button>
            </form>
        </main>
    )
}