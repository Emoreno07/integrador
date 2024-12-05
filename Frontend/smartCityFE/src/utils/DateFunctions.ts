import { axis, Data } from "./types";

export function mostRecentDateFromDates(data: Data[]) : Data{
    //se um sensor deu valores de um tipo em uma mesma hora, apenas o maior é considerado... aqui o filtro.
    const recentValue = data.reduce((prev,current) => {
        let prevData = new Date(prev.timestamp);
        let currentData = new Date(current.timestamp)
        return (prevData > currentData) ? prev : current
    })
    return recentValue

}
export function divideValuesBasedOnDate(typeOfDivider : 'Minutos' | 'Segundos' | 'Horas' | 'Dias' | 'Milisegundos', arrayOfDates : Data[]) : axis[] | undefined{
    let possibleTypesOfDate;
    let dataSet : axis[] = [];
        if(typeOfDivider == 'Horas'){
            //verifica quais são todas as possíveis horas em que o array pode ser dividido
            possibleTypesOfDate = [...new Set(arrayOfDates.map((date) => new Date(date.timestamp).getHours()))]
        /// divide os valores com base nos tipos de horas possiveis
        const divided = possibleTypesOfDate?.map((type) =>{
            return arrayOfDates.filter((date) => new Date(date.timestamp).getHours() === type)
        })
        //dos valores que estão na hora dada, pega o mais recente dentro deles
        const mostRecentDateDivided = divided?.map((dateDivided) => {
            return mostRecentDateFromDates(dateDivided)
        })
        //converter para o dataset
        dataSet = mostRecentDateDivided?.map((recentDate) =>{
            const axis : axis = {
                x : new Date(recentDate.timestamp).getHours(),
                y : recentDate.valor
            }
            return axis
        })
    }
    return dataSet 
}

export function getALlDataFromDay(date : Date, data : Data[]) : Data[]{
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear();
        return data.filter(
            (date) =>
                new Date(date.timestamp).getDate() == day &&
                new Date(date.timestamp).getMonth() + 1 == month &&
                new Date(date.timestamp).getFullYear() == year

        )
}