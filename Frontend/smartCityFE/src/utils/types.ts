export interface Sensor {
    id? : number,
    tipo: 'temperatura' | 'umidade' | 'luminosidade' | 'contador'
    unidade_medida: string,
    latitude: number,
    longitude: number,
    localizacao: string,
    reponsavel: string,
    status: boolean,
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
export interface Token{
    access?: string,
    refresh?: string
}