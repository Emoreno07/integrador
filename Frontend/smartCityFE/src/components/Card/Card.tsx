import { SetStateAction, useEffect, useState } from "react";
import { Data, Sensor } from "../../utils/types.ts";
import styles from './card.module.css'
import { getDataFromSensor, showSensorData, activeSensor } from "../../services/sensorService.ts";
import { getAccessByRefresh } from "../../services/loginService.ts";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Card({_sensor} : {_sensor : Sensor}){
    const [dados, setDados] = useState<Data | string | number | undefined>("carregando");
    const navigation = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies();
    const [access, setAccess] = useState<string>('');
    const [sensor, setSensor] = useState<Sensor>(_sensor);
    useEffect(() =>{    

        async function getData(){
            const [isAuthorized, acc] = await getAccessByRefresh(cookies['refreshToken']);
            if(!isAuthorized || !acc){
                navigation('/login')
            }
            else{
                setAccess(acc)
                let data = await getDataFromSensor(sensor,acc); 
                setDados((data))
                
            }
        }
        getData()
       
    },[cookies,sensor])
    return (
        <>

        <div className={`flex-container flex-center ${styles['sensor']}`}>
            <div className={`${styles['barrinha-lateral'    ]}`}></div>
            <div className={`flex-container flex-center flex-column grow ${styles['info-card']}`}>
                <h2 className={`${styles['titulo-card']}`}>Sensor de {sensor.tipo}</h2>
                <h3>{showSensorData(dados,sensor)}</h3>
            <img src={`/assets/sensor-${sensor.tipo}.png`}  className={styles['img-card']} />
                <h3><strong>Status</strong>: {sensor.status_operacional ? 'Ativo' : "Inativo"}</h3>
                <h1></h1>
                <button onClick={activeSensor(sensor,access,setSensor)}>{sensor.status_operacional? "DESATIVAR" : "ATIVAR"}</button>
            </div>
        </div>
        </>
        
    )
}