import { getAllSensors } from "./sensorService";
import type { areaComData, Data } from "../utils/types";
export default async function getAllDataFromType(type : string, access: string) : Promise<areaComData[]>{
    //obtem todos os dados do tipo requerido(temperatura,contador,etc)
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
    // obtem todas as possíveis areas dos sensores
    const areas = new Set(sensores.map((sensor) => sensor.localizacao));
    areas.forEach((area) => {
        //para cada área, coloque os sensores que pertencem àquela area a fim de filtrar os valores de dados
        const sensoresFromArea = sensores.filter((sensor) => sensor.localizacao === area)
        valuesWithArea.push({
            tipo: type,
            area : area,
            //coloca todos os valores encontrados incialmente, separados por area(a separação é feita pela área do sensor que extraiu a data. ou seja um valor tirado de um sensor de temperatura sera um dado de temperatura
            data: valuesWithType.filter((value) => sensoresFromArea.some((sensor) => sensor.id === value.sensor))
        })
    })
    return valuesWithArea;
    

}