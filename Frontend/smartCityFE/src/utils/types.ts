export const tipos = ['temperatura','umidade','luminosidade','contador'] as const;
export interface Sensor {
    id? : number,
    tipo: typeof tipos[number]
    unidade_medida: string,
    latitude: number,
    longitude: number,
    localizacao: string,
    reponsavel: string,
    status_operacional: boolean,
    observacao?: string,
    mac_address?: string,
    nome?: string,
    dados?: string,
}
export interface Data{
    id? : number,
    sensor : number
    timestamp: string
    valor?: number,
    results?: Data[]

}
export interface loginSchema{
    username: string,
    password: string,
}
export interface cadastroSchema extends loginSchema{
    email: string
}
export interface Token{
    access?: string,
    refresh?: string
}
export interface areaComData{
    tipo: string
    area: string,
    data : Data[]
}
export interface dataSet{
    label: string,
    data : any
}