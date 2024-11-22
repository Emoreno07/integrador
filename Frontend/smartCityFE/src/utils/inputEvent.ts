import { SyntheticEvent, SetStateAction } from "react"

//decidi fazer um evento de input para todos os inputs, reduzindo codigo cque tinha if.
export function handleFormStateInput(setInputState : SetStateAction<any>){
    //eventos esperam uma função (e : event =>) como typescript tem varios inputs text,radio e etc usei SyntheticEvent<HTMLInputElement>
    return (event: SyntheticEvent<HTMLInputElement>) => setInputState(event.currentTarget.value)
}