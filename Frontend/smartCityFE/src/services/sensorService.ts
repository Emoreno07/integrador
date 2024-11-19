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
            'Authorization' : 'Bearer ' + accessToken
        },
        body: JSON.stringify({
            "sensor_id" : sensor.id
        })
    })
    const dadosSensor : Data[] = await resData.json();
    if(dadosSensor.length == 0){
        return undefined
    }
    const highestValue = dadosSensor.reduce((prev,current) => {
        let prevData = new Date(prev.timestamp);
        let currentData = new Date(current.timestamp)
        return (prevData > currentData) ? prev : current
    })
    return highestValue
}
export async function getSensor(){

}