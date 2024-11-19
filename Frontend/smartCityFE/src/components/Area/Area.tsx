import { useEffect, useState } from "react";
import { getAllSensors } from "../../services/sensorService.ts";
import Card from "../Card/Card.tsx";
import styles from './area.module.css'
import { getAccessByRefresh } from "../../services/loginService.ts";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Sensor } from "../../utils/types.ts";
export default function Area({area, sensores} : {area : string, sensores: Sensor[]}){
    return(
        <section className={`flex-container ${styles['section']}`}>
            <h1>{area}</h1>
            <div className={`flex-container ${styles['area-card']}`}>
            {sensores.map((sensor,i)=> (
                <Card key={i} sensor={sensor}/>
            ))}
            </div>
            
        </section>
    )
    
}