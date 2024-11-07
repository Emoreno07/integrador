export interface Sensor {
    tipo: 'Temperatura' | 'Umidade' | 'Luminosidade' | 'Contador'
    unidadeMedida: string,
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
    sensor : Sensor
    timestamp: string
    valor?: number,

}