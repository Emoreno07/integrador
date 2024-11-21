import { useEffect, useState } from "react";
import { Data, Sensor } from "../../utils/types.ts";
import styles from './card.module.css'
import { getDataFromSensor } from "../../services/sensorService.ts";
import { getAccessByRefresh } from "../../services/loginService.ts";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
export default function Card({sensor} : {sensor : Sensor}){
    const [dados, setDados] = useState<Data | string | undefined>("carregando");
    const navigation = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies();
    useEffect(() =>{

        async function getData(){
            const [isAuthorized, access] = await getAccessByRefresh(cookies['refreshToken']);
            if(!isAuthorized || !access){
                navigation('/login')
            }
            else{
                const data = await getDataFromSensor(sensor,access); 
                setDados((data))
            }
        }
        getData()
       
    },[cookies])
    return (
        <>
        {console.log(sensor)}
        <div className={`flex-container flex-center ${styles['sensor']}`}>
            <div className={`${styles['barrinha-lateral']}`}></div>
            <div className={`flex-container flex-center flex-column grow ${styles['info-card']}`}>
                <h2>Sensor de {sensor.tipo}. ID : {sensor.id}</h2>
                <h3>D}</h3>
                <h3></h3>
                <h1></h1>
                <button>Ativar</button>
            </div>
        </div>
        </>
        
    )
}