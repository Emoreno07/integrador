import { useEffect, useState } from 'react';
import styles from './CadastroSensor.module.css';
import { useNavigate } from 'react-router-dom';
import { createUser, LogWithToken } from '../../services/loginService';
import { useCookies } from 'react-cookie';
import { handleFormStateInput } from '../../utils/inputEvent';
import { createSensor } from '../../services/sensorService';
import {tipos} from '../../utils/types';
import GetAreas from '../../services/areas';
export default function CadastroSensor(){
    const navigation = useNavigate();
    const [access, setAccess] = useState<string>('');
    const [cookies, setCookies, removeCookies] = useCookies();
    const [tipo, setTipo] = useState<typeof tipos[number]>('Temperatura');
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [local, setlocal] = useState<string>('');
    const [responsavel, setResponsavel] = useState<string>('');
    const [ob, setOb] = useState<string>('');
    const [un,setUn] = useState<string>('');
    const [areas,setAreas] = useState<string[]>([]);
    const [outro, setOutro] = useState<string>('');
    useEffect(() =>{
        async function getLog(){
            const myAccess = await LogWithToken(cookies['refreshToken'])
            if(!myAccess){
                navigation('/login')
            }
            else{
                const myAreas = await GetAreas(myAccess);
                setAreas(myAreas)
                setAccess(myAccess)
            
            }
        }
        getLog()
        return () =>{}
    },[cookies])
    return (
        <main className='flex-container flex-center flex-column'>
            <h1> CADASTRO DE SENSORES</h1>
            <form className={`flex-container flex-center flex-column ${styles['cadastro-add']}`}>
                <div className={`flex-container ${styles['input-area']}`}>
                    <label htmlFor="tipo">tipo</label>
                    <input onChange={handleFormStateInput(setTipo)} list='list' id='tipo'/>
                    <datalist id='list'>
                        {tipos.map((tipo,i) => (
                            <option key={i} value={tipo}>{tipo}</option>
                        ))}
                        
                    </datalist>
                </div>
                <div className={`flex-container ${styles['input-area']}`}>
                    <label htmlFor="local">localização</label>
                    {
                        local !== 'outro' ?
                        <>
                            <input  onChange={handleFormStateInput(setlocal)} list='list-local' id='local' />
                            <datalist id='list-local'>
                                {areas.map((area,i ) =>(
                                    <option key={i} value={area}>{area}</option>
                                ))}
                                <option value='outro'>outro</option>
                            </datalist> 
                        </> :
                        <>
                            <div className={`flex-container ${styles['input-area']}`}>
                                <input type="text" onChange={handleFormStateInput(setOutro)} id='outro' placeholder='Digite-o Aqui'/>
                            </div>
                        </>
                    }
                      
                </div>
                
                <div className={`flex-container ${styles['input-area']}`}>
                    <label htmlFor="responsavel">responsavel</label>
                    <input onChange={handleFormStateInput(setResponsavel)} type="text" id='responsavel' />
                </div>
                <div className={`flex-container ${styles['input-area']}`}>
                    <label htmlFor="observation">observação</label>
                    <input onChange={handleFormStateInput(setOb)} type="text" id='observation' />
                </div>
                <div className={`flex-container flex-center ${styles['input-area']}`}>
                    <label htmlFor="latitude">latitude</label>
                    <input onChange={handleFormStateInput(setLatitude)} type="number" id='latitude' />
                </div>
                <div className={`flex-container flex-center ${styles['input-area']}`}>
                    <label htmlFor="longitude">longitude</label>
                    <input onChange={handleFormStateInput(setLongitude)} type="number" id='longitude' />
                </div>

                
                <button onClick={(e) =>{
                    e.preventDefault()
                    if(!areas.some(area => area === local || local === 'outro')){
                        alert('Area inválida!'); return;
                    }
                    if(!tipos.some((tipo) => tipo === tipo)){
                        alert('Tipo de sensor Inválido'); return;
                    }
                    createSensor({
                        tipo: tipo,
                        unidade_medida : un,
                        latitude : latitude,
                        localizacao : (local !== 'outro') ? local : outro,
                        longitude : longitude,
                        observacao : ob,
                        responsavel : responsavel,
                        status_operacional : false
                    },access).then((e) => alert(e))
                }} type="submit">Cadastrar Sensor</button>
            </form>
        </main>
    )
}