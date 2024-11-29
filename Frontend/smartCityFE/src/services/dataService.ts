import { getAllSensors } from "./sensorService";
import type { areaComData, Data } from "../utils/types";
export default async function getAllDataFromType(type : string, access: string) : Promise<areaComData[]>{
    const data = await fetch(`http://localhost:8000/api/${type}`,{
        method: 'GET',
        headers:{
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + access
        }
    })
    let valuesWithArea : areaComData[] = [];
    const valuesWithType : Data[] = await data.json();
    const sensores = await getAllSensors(access);
    const areas = new Set(sensores.map((sensor) => sensor.localizacao));
    areas.forEach((area) => {
        const sensoresFromArea = sensores.filter((sensor) => sensor.localizacao === area)
        valuesWithArea.push({
            tipo: type,
            area : area,
            data: valuesWithType.filter((value) => sensoresFromArea.some((sensor) => sensor.id === value.sensor))
        })
    })
    return valuesWithArea;
    

}