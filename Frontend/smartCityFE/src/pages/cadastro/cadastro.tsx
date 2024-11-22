import styles from './cadastro.module.css'
import { createUser} from '../../services/loginService'
import { useState } from 'react'
import { handleFormStateInput } from '../../utils/inputEvent';
export default function Cadastro(){
    const [user,setUser] = useState<string>('');
    const [email,setEmail] = useState<string>('')
    const [pass, setPass] = useState<string>('');
    return(
        <main className="flex-container flex-center">
            <form className={`flex-container flex-center flex-column ${styles['section']}`}>
                <h1>CADASTRO</h1>
                <h2 className={`${styles['h2']}`}>Usuário</h2>
                <input
                id='user'
                className={`${styles['input']}`}
                type="text"
                required={true}
                placeholder='meu usuario'
                onChange={handleFormStateInput(setUser)}/>

                <h2 className={`${styles['h2']}`}>Email</h2>
                <input
                id='email'
                className={`${styles['input']}`}
                type="email"
                required={true}
                placeholder='example@example.com'
                onChange={handleFormStateInput(setEmail)}/>

                <h2 className={`${styles['h2']}`}>Senha</h2>             
                <input
                    id='senha'
                    className={`${styles['input']}`}
                    type="password"
                    required={true}
                    placeholder='minha senha'
                    onChange={handleFormStateInput(setPass)}/>
                <span>Já tem Login? <a href='/login'>faça login</a></span>       
                <button onClick={(e) => {
                    createUser(user,pass,email,e)
                    .then(message => alert(message))
                }} type="submit" id='button-login'>Cadastrar</button>
            </form>           
        </main>     
    )
}