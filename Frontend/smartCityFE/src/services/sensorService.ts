import { SetStateAction, SyntheticEvent } from "react";
import { Data, Sensor } from "../utils/types";
import { mostRecentDateFromDates } from "../utils/DateFunctions";

export async function getAllSensors(accessToken : string) : Promise<Sensor[]>{
    //obtem todos os sensores
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
    //obtem todos os dados de um determindado sensor
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
        return mostRecentDateFromDates(dadosSensor)
    }
    //se é um sensor de contador, é tratado de forma diferente
    else{
        return dadosSensor.results?.length;
    }
    
   
}
export function showSensorData(data : Data | string | number | undefined, sensor : Sensor){
    //formata os dados de um sensor de acordo com os parâmetros
    if(typeof(data) === 'string'){
        return data
    }
    else if(typeof(data) === 'number'){
        return 'Dados: ' + data + ' Pessoas'
    }
    return "Dados: " + ((data?.valor === undefined) ? "N/A" : data?.valor + sensor.unidade_medida)
}
export function activeSensor(sensor: Sensor, access : string, setSensor : SetStateAction<any>){
    //ativa o sensor no banco
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
export function setSensorData(sensor: Sensor, access: string, setData : SetStateAction<any>, setInput : SetStateAction<any>){
    //coloca o novo valor do sensor passado no campo
    return async (e : SyntheticEvent<HTMLInputElement>) =>{
        let data : string | number = e.currentTarget.value;
        //caso o campo esteja vazio, não muda nada.
        if(!data){
            setInput('none')
            return;
        }
        data = Number(data)
        let body = undefined;
        let res;
        // a requisição para mudar o valor do sensor é diferente quando o sensor é contador
        if(sensor.tipo != 'Contador'){
            body = {
                valor: data,
                sensor: sensor.id
            }
            res = await fetch(`http://localhost:8000/api/${sensor.tipo}/`,{
                method: 'POST',
                headers :{
                    'Content-Type' : 'application/json',
                    'Authorization': 'Bearer ' + access
                },
                body : JSON.stringify(body)
            })
            const json = await res.json();
            setData(json)
        }
        else{
            body = {
                sensor: sensor.id
            }
            for(let i = 0; i < data; i++){
                res = await fetch(`http://localhost:8000/api/${sensor.tipo.toLowerCase()}/`,{
                    method: 'POST',
                    headers :{
                        'Content-Type' : 'application/json',
                        'Authorization': 'Bearer ' + access
                    },
                    body : JSON.stringify(body)
                })
                setData(data)
            }
        }
        setInput('none')
        return
    }
    //mandar um novo valor atualiza o valor do sensor, pois o sensor ele pegará o valor mais recente que está no id dele no banco.
}
export async function createSensor(sensor : Sensor, access : string) : Promise<Sensor | string>{
    const res = await fetch('http://127.0.0.1:8000/api/sensores/',{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + access
        },
        body: JSON.stringify(sensor)
    })
    return (res.status !== 201) ? res.text().then(e => e) : 'Cadastrado Com sucesso!'
    
}