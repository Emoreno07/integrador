import { useEffect, useRef, useState } from 'react'
import { Data } from '../../utils/types'
import styles from './AreaDashboard.module.css'
import Chart from 'chart.js/auto';
import getAllDataFromType from '../../services/dataService';
export default function AreaDashboard({tipo, access} : {tipo :string, access: string}){
    const ref = useRef<any | null>(null);
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const [data,setData] = useState<Data[]>();
    useEffect(() =>{
      const a = async () =>{
        const dados = await getAllDataFromType(tipo,access)
      }
            if(!canvas.current) return;
            if(ref.current){
                ref.current.destroy();
            }
            ref.current = new Chart(canvas.current, {
                type: 'bar',
                data: {
                  datasets: [{
                    label: 'uhu',
                    data: [{x: 'Sales', y: 20}, {x: 'Revenue', y: 10}]
                  }]
                },
                options:{
                  scales:{
                    x:{
                      position:'right',
                      ticks:{
                     
                      }
                    },
                    y:{
                      max: 100,
                      min: 0,
                      ticks:{
                        callback : (v,i,t) => v + '$'
                      }
                    }
                    
                  }
                }
              });
    },[tipo])
    
    return(
        <section className={`flex-container flex-center flex-column`}>
            <h1>Dados de {tipo}</h1>
            <div className={`flex-container flex-center ${styles['grafico']}`}>
            <canvas width='400px' height='400px' ref={canvas}></canvas>
            </div>
            
        </section>
    )
}