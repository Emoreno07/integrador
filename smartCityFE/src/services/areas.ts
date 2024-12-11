//as areas dos sensores. só mudar oarray para adicionar/diminuir as areas que aparecerão na tela de sensores.
//TODO: automatizar as áreas de acordo com a quantidade de áreas em todos os sensores. dinamizar...

import type { Sensor } from "../utils/types"

export default async function GetAreas(access : string) : Promise<string[]>{
    const res = await fetch('http://localhost:8000/api/sensores',{
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + access
        },
        method : 'GET'
    })
    const sensors : Sensor[] = await res.json()
    const areas : string[] = [...new Set<string>(sensors.map((sensor) => sensor.localizacao))]
    return areas;
}