import styles from './sensores.module.css'
export default function Sensores(){
    const areas = ['REFEITORIO', 'SALAS DE AULA','BIBLIOTECA','AUDITORIO','ESTACIONAMENTO']
    return (
        <main className={`${styles['main']}`}>
            <p className="titulo">CONTROLE DAS ÁREAS</p>
            {areas.map(
                
            )}
        </main>
    )
}