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
                let mysensores = await getAllSensors(access)
                setSensores(mysensores.map(sensor =>{
                    let {localizacao, ...rest} = sensor;
                    localizacao = areas[(Math.trunc(Math.random() * 5))];
                    const s = {localizacao, ...rest};
                    return s
                }))
            }
            
        }
        getLog()
        return () =>{}
    },[])
    return (
        <main className={`${styles['main']}`}>
            <p className="titulo">CONTROLE DAS ÁREAS</p>
            {areas.map((area, i)=> (
                <Area key={i} area={area} sensores={sensores.filter(s => s.localizacao === areas[i])}/>
            ))}
        </main>
    )
}