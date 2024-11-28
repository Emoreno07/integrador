import styles from './dashboards.module.css'
import { Chart } from 'chart.js'
import AreaDashboard from '../../components/AreaDashboard/AreaDashboard'
import {Data, tipos} from '../../utils/types'
import { useEffect, useState } from 'react'
export default function DashBoards(){

    useEffect(() =>{
        
    })
    return(
        <main className={`flex-container flex-center flex-column`}>
            {tipos.map((tipo,i) =>(
                <AreaDashboard key={i} tipo={tipo}/>
            ))}
        </main>
    )
}