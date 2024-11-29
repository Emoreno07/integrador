import { useEffect, useRef, useState } from 'react'
import { Data, dataSet } from '../../utils/types'
import styles from './AreaDashboard.module.css'
import Chart from 'chart.js/auto';
import getAllDataFromType from '../../services/dataService';
export default function AreaDashboard({tipo, access} : {tipo :string, access: string}){
    const ref = useRef<any | null>(null);
    const canvas = useRef<HTMLCanvasElement | null>(null);
    const [data,setData] = useState<Data[]>([]);
    const [datasets, setDatasets] = useState<dataSet[]>([]);
    const [labels,setLabels] = useState<number[]>([]);
    useEffect(() =>{
      if(!canvas.current || labels.length == 0) return;
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
                  scales:{
                    x:{
                      min: 0, max: 24,
                      ticks:{
                        callback: (v,i,t) => v+'H'
                      }
                    },
                    y:{
                      max: 1000,
                      min: 0,
                    }
                    
                  }
                }
              });
    },[labels])
    useEffect(() =>{
      const a = async () =>{
        const dados = await getAllDataFromType(tipo,access);
        
        // const possibleHours = [...new Set(getDataLabels.map((datalabel) => new Date(datalabel.timestamp).getHours()))]
        // const hoursDivided =  possibleHours.map((hour) =>{
        //   const arrayOfSinglehours = getDataLabels.filter((data) => new Date(data.timestamp).getHours() == hour)
        //   console.log(arrayOfSinglehours)
        //   return arrayOfSinglehours.reduce((prev,current) => {
        //     let prevData = new Date(prev.timestamp);
        //     let currentData = new Date(current.timestamp)
        //     return (prevData > currentData) ? prev : current
        // })
        // })
        const myDatasets = dados.map((dado) =>{
          return {
            label: dado.area,
            data : dado.data.reduce()
          } 
        })
        
        // setDatasets(myDatasets)
        // const datas = getDataLabels.map((data) => new Date(data.timestamp));
        // let hours = [...new Set(datas.map((hour) => hour.getHours()))]
        // hours = hours.sort((a,b) => a - b)  
        // setLabels(hours)
        
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