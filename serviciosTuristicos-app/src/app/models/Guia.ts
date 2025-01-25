import {Excursion} from "./Excursion"
export interface Guia{ 
    id?:number; 
    name: string;
    age: number;   
    years_of_Experience: string;
    image: string;
    active: boolean; 
    ExcursionId: number;
    excursion?: Excursion|null;
}


