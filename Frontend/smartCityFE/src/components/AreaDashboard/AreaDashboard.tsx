import { useEffect, useRef, useState } from 'react'
import { Data, dataSet } from '../../utils/types'
import styles from './AreaDashboard.module.css'
import Chart from 'chart.js/auto';
import getAllDataFromType from '../../services/dataService';
import { divideValuesBasedOnDate } from '../../utils/DateFunctions';
import { getAllSensors } from '../../services/sensorService';
export default function AreaDashboard({tipo, access} : {tipo :string, access: string}){
    const ref = useRef<any | null>(null);
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const [data,setData] = useState<Data[]>([]);
    const [datasets, setDatasets] = useState<dataSet[]>([]);
    const [labels,setLabels] = useState<number[]>([]);
    const [unidade, setUnidade] = useState<string | undefined>();
    useEffect(() =>{
      //luminosidade tem um valor bem maior que o resto dos gráficos, então tem que diferenciar
      const isLuminosidade = tipo.toLowerCase() === 'luminosidade';
      const sensors = getAllSensors(access).then(sensores => setUnidade(sensores.find((sensor) => sensor.tipo.toLowerCase() === tipo)?.unidade_medida))
      
      if(!canvas.current) return;
            if(ref.current){
                ref.current.destroy();
            }
            ref.current = new Chart(canvas.current, {
                type: 'line',
                data: {
                  labels: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
                  datasets: datasets
                },
                options:{
                  maintainAspectRatio : false,
                  scales:{
                    x:{
                      min: 0, max: 24,
                      ticks:{
                        callback: (v,i,t) => v+'H'
                      }
                    },
                    y:{
                      max: (isLuminosidade) ? 1000 : 100,
                      min: 0,
                      ticks:{
                        callback: (v,i,t) => v+(unidade ?? '')
                      }
                    }
                    
                  }
                }
              });
    },[datasets,unidade])
    useEffect(() =>{
      const a = async () =>{
        const dados = await getAllDataFromType(tipo,access);
      
        const myDatasets  = dados.map((dado) =>{
          return {
            label: dado.area,
            data : divideValuesBasedOnDate('Horas',dado.data)
          } 
        })
        setDatasets(myDatasets)
        
      }
      a();
    },[])
    
    return(
        <section className={`flex-container flex-center flex-column`}>
            <h1>Dados de {tipo}</h1>
            <div className={`flex-container flex-center ${styles['grafico']}`}>
            <canvas ref={canvas}></canvas>
            </div>          
        </section>
    )
}