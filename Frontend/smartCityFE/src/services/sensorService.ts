import { SetStateAction } from "react";
import { Data, Sensor } from "../utils/types";

export async function getAllSensors(accessToken : string) : Promise<Sensor[]>{
    const sensoresResponse = await fetch('http://127.0.0.1:8000/api/sensores',{
        method : 'GET',
        headers : {
            'Authorization' : 'Bearer ' + accessToken
        }
    });
    const sensores = await sensoresResponse.json();
    return sensores
}
export async function getDataFromSensor(sensor : Sensor, accessToken : string) : Promise<Data | number | undefined>{
    const resData = await fetch(`http://127.0.0.1:8000/api/${sensor.tipo}_filter/`,{
        method : 'POST',
        headers: {
            'Authorization' : 'Bearer ' + accessToken,
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            "sensor_id" : sensor.id
        })
    })
    const dadosSensor : Data[] | Data =  await resData.json();
    if(dadosSensor instanceof Array){
        if(dadosSensor.length === 0) return undefined;
        const highestValue = dadosSensor.reduce((prev,current) => {
            let prevData = new Date(prev.timestamp);
            let currentData = new Date(current.timestamp)
            return (prevData > currentData) ? prev : current
        })
        return highestValue
    }
    else{
        return dadosSensor.results?.length;
    }
    
   
}
export function showSensorData(data : Data | string | number | undefined, sensor : Sensor){
    if(typeof(data) === 'string'){
        return data
    }
    else if(typeof(data) === 'number'){
        return 'Dados: ' + data + ' Pessoas'
    }
    return "Dados: " + ((data?.valor === undefined) ? "N/A" : data?.valor + sensor.unidade_medida)
}
export function activeSensor(sensor: Sensor, access : string, setSensor : SetStateAction<any>){
    return async () =>{
        const res = await fetch(`http://localhost:8000/api/sensores/${sensor.id}/`,{
            method:'PATCH',
            headers:{
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + access
                },
                body: JSON.stringify({
                    status_operacional : !sensor.status_operacional
                })
        })
        const json = await res.json();
        setSensor(json)
    }
    
}