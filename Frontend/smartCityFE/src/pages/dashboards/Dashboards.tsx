import styles from './dashboards.module.css'
import { Chart } from 'chart.js'
import AreaDashboard from '../../components/AreaDashboard/AreaDashboard'
import {Data, tipos} from '../../utils/types'
import { useEffect, useState } from 'react'
import { LogWithToken } from '../../services/loginService'
import { useCookies } from 'react-cookie'
export default function DashBoards(){
    const [token,setToken] = useState('');
    const [cookies, setCookies,removeCookies] = useCookies();
    useEffect(() =>{
        (async () =>{
            const token = await LogWithToken(cookies['refreshToken'])
            setToken(token)
        })()
    },[])
    return(
        <main className={`flex-container flex-center flex-column`}>
            {token && tipos.map((tipo,i) =>(
                <AreaDashboard key={i} access={token} tipo={tipo}/>
            ))}
        </main>
    )
}