import { useEffect, useRef, useState } from 'react'
import { Data,dataSet } from '../../utils/types'
import styles from './AreaDashboard.module.css'
import Chart from 'chart.js/auto';
import getAllDataFromType from '../../services/dataService';
import { divideValuesBasedOnDate, getALlDataFromDay } from '../../utils/DateFunctions';
import { getAllSensors } from '../../services/sensorService';
import { handleFormStateInput } from '../../utils/inputEvent';
export default function AreaDashboard({tipo, access} : {tipo :string, access: string}){
    const ref = useRef<any | null>(null);
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const [datasets, setDatasets] = useState<dataSet[]>([]);
    const [unidade, setUnidade] = useState<string | undefined>();
    const [date,SetDate] = useState<string>('');
    const defaultDate = new Date(Date.now())
    const dateFormatted = `${defaultDate.getFullYear()}-${defaultDate.toLocaleString("pt-br",{ month : '2-digit'})}-${defaultDate.toLocaleString("pt-br",{ day : '2-digit'})}`;
    useEffect(() =>{
      //luminosidade tem um valor bem maior que o resto dos gráficos, então tem que diferenciar
      const isLuminosidade = tipo.toLowerCase() === 'luminosidade';
      getAllSensors(access).then(sensores => setUnidade(sensores.find((sensor) => sensor.tipo.toLowerCase() === tipo.toLowerCase())?.unidade_medida))
      console.log(unidade)
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
          let data : Data[] = [];
          if(date){
            data = getALlDataFromDay(new Date(`${date}T00:00:00`),dado.data)
          }
          else{
            data = getALlDataFromDay(defaultDate,dado.data)
          }
          return {
            label: dado.area,
            data : divideValuesBasedOnDate('Horas',data)
          } 
        })
        setDatasets(myDatasets)
        
      }
      a();
    },[date])
    
    return(
        <section className={`flex-container flex-center flex-column ${styles['section']}`}>
          <div className={`flex-container ${styles['title-date-picker']}`}>
            <h1>Dados de {tipo}</h1>
            <input onChange={handleFormStateInput(SetDate)} type="date" defaultValue={dateFormatted}/>
          </div>
            
            <div className={`flex-container flex-center ${styles['grafico']}`}>
            <canvas ref={canvas}></canvas>
            </div>          
        </section>
    )
}