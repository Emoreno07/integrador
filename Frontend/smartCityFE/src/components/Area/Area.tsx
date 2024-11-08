import Card from "../Card/Card.tsx";
import styles from './area.module.css'
export default function Area(area: string){
    return(
        <section className="flex-container">
            <h1>{area}</h1>
        </section>
    )
    
}