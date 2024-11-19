import { useEffect, useState } from "react";
import { Data, Sensor } from "../../utils/types.ts";
import styles from './card.module.css'
import { getDataFromSensor } from "../../services/sensorService.ts";
import { getAccessByRefresh } from "../../services/loginService.ts";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
export default function Card({sensor} : {sensor : Sensor}){
    const [dados, setDados] = useState<Data>();
    const navigation = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies();
    useEffect(() =>{

        async function getData(){
            const [isAuthorized, access] = await getAccessByRefresh(cookies['refreshToken']);
            if(!isAuthorized || !access){
                navigation('/login')
            }
            else{
                const dados = await getDataFromSensor(sensor,access); 
            }
        }
        getData()
       
    })
    return (
        <div className={`flex-container flex-center ${styles['sensor']}`}>
            <div className={`${styles['barrinha-lateral']}`}></div>
            <div className={`flex-container flex-center flex-column grow ${styles['info-card']}`}>
                <h2>Sensor de {sensor.tipo}</h2>
                <h3>Dados {dados?.valor ?? "N/A"}</h3>
                <h1></h1>
                <button>Ativar</button>
            </div>
        </div>
    )
}