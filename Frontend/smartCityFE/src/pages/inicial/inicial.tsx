import styles from './inicial.module.css';
export default function Inicial(){
    return(
        <main className={`flex-container flex-center`}>
            <section className={`flex-container flex-center`}>
                <p className={`flex-container flex-center titulo`} >SMART CITY</p>
                {/* <img className={` ${styles['img-logo']}`} src={logo} alt="" />  */}
            </section>
            <section className={`flex-container flex-center `}>
                <div className={`flex-container grow flex-column ${styles['area']} ${styles['como-ver']}`}>
                    <h1 className={`${styles['h1']}`}>COMO VER TODAS AS INFORMAÇÕES EM TEMPO REAL?</h1>
                    <button style={{backgroundColor: '#000'}}>VER MAIS</button>
                </div>
                <div className={`flex-container grow flex-column ${styles['area']} ${styles['o-que']}`}>
                    <h1 className={`${styles['h1']}`}>O QUE É A SMARTCITY? E O QUE ELA FAZ?</h1>
                    <h2 className={`${styles['h2']}`}>aplicativo desenvolvido com a intenção de</h2>
                    <button >VER MAIS</button>
                </div>
            </section>
            <section className={`flex-container flex-center`}>
                <p className={`flex-container flex-center titulo`} >SMART CITY</p>
                {/* <img className={` ${styles['img-logo']}`} src={logo} alt="" />  */}
            </section>
        </main>     
    )
}