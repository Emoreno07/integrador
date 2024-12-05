import { useNavigate } from 'react-router-dom';
import Area from '../../components/Area/Area'
import styles from './sensores.module.css'
import { useEffect, useState } from 'react';
import { Sensor } from '../../utils/types';
import { useCookies } from 'react-cookie';
import { LogWithToken } from '../../services/loginService';
import { getAllSensors } from '../../services/sensorService';
import GetAreas from '../../services/areas';
export default function Sensores(){
    const [areas, setAreas] = useState<string[]>([]);
    const navigation = useNavigate();
    const [sensores, setSensores] = useState<Sensor[]>([])
    const [cookies, setCookies, removeCookies] = useCookies();
    useEffect(() =>{
        async function getLog(){
            const access = await LogWithToken(cookies['refreshToken'])
            if(!access){
                navigation('/login')
            }
            else{
                const myAreas = await GetAreas(access)
                setAreas(myAreas)
                const Allsensors = await getAllSensors(access)
                setSensores(Allsensors)
            }
            
        }
        getLog()
        return () =>{}
    },[cookies])
    return (
        <main className={`${styles['main']}`}>
            <div className={`flex-container flex-center ${styles['separator']}`}>
            <p className="titulo">CONTROLE DAS ÁREAS</p>
            <img onClick={() => navigation('/sensores/addsensor')} className={styles['img-add']} src="/assets/add.png" alt="" />
            </div>
            
            {areas.map((area, i)=> (
                <Area key={i} area={area} sensores={sensores.filter(s => s.localizacao === area)}/>
            ))}
        </main>
    )
}