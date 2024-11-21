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
export async function getDataFromSensor(sensor : Sensor, accessToken : string) : Promise<Data | undefined>{
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
        if(dadosSensor.results?.length !==0){
            const highestValue = dadosSensor.results?.reduce((prev,current) => {
                let prevData = new Date(prev.timestamp);
                let currentData = new Date(current.timestamp)
                return (prevData > currentData) ? prev : current
            })
            return highestValue
        }
        else{
            return undefined
        }
    }
    
   
}
export async function getSensor(){

}