import { useEffect, useState } from "react";
import { Data, Sensor } from "../../utils/types.ts";
import styles from './card.module.css'
import { getDataFromSensor, showSensorData } from "../../services/sensorService.ts";
import { getAccessByRefresh } from "../../services/loginService.ts";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Card({sensor} : {sensor : Sensor}){
    const [dados, setDados] = useState<Data | string | number | undefined>("carregando");
    const navigation = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies();
    useEffect(() =>{

        async function getData(){
            const [isAuthorized, access] = await getAccessByRefresh(cookies['refreshToken']);
            if(!isAuthorized || !access){
                navigation('/login')
            }
            else{
                let data = await getDataFromSensor(sensor,access); 
                setDados((data))
            }
        }
        getData()
       
    },[cookies])
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
                <button>{sensor.status_operacional? "DESATIVAR" : "ATIVAR"}</button>
            </div>
        </div>
        </>
        
    )
}