import { useNavigate } from 'react-router-dom';
import Area from '../../components/Area/Area'
import { areas } from '../../utils/areas'
import styles from './sensores.module.css'
import { useEffect, useState } from 'react';
import { Sensor } from '../../utils/types';
import { useCookies } from 'react-cookie';
import { getAccessByRefresh } from '../../services/loginService';
import { getAllSensors } from '../../services/sensorService';
export default function Sensores(){
    const navigation = useNavigate();
    const [sensores, setSensores] = useState<Sensor[]>([])
    const [cookies, setCookies, removeCookies] = useCookies();
    useEffect(() =>{
        async function getLog(){
            const [isAuthorized, access] = await getAccessByRefresh(cookies['refreshToken']);
            if(!isAuthorized || !access){
                navigation('/login')
            }
            else{
                const Allsensors = await getAllSensors(access)
                setSensores(Allsensors)
            }
            
        }
        getLog()
        return () =>{}
    },[cookies])
    return (
        <main className={`${styles['main']}`}>
            <p className="titulo">CONTROLE DAS ÁREAS</p>
            {areas.map((area, i)=> (
                <Area key={i} area={area} sensores={sensores.filter(s => s.localizacao === area)}/>
            ))}
        </main>
    )
}