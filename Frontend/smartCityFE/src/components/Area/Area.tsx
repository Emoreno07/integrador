import Card from "../Card/Card.tsx";
import styles from './area.module.css'
import { Sensor } from "../../utils/types.ts";
export default function Area({area, sensores} : {area : string, sensores: Sensor[]}){
    return(
        <section className={`flex-container ${styles['section']}`}>
            <h1>{area}</h1>
            <div className={`flex-container ${styles['area-card']}`}>
            {sensores.map((sensor,i)=> (
                <Card key={i} _sensor={sensor}/>
            ))}
            </div>
            
        </section>
    )
    
}