export interface Product {
    _id?:string;
    name?:string;
    price?:number;
    country?:string;
    date_manufacture?:Date;
    description?:string;
    date_added?:Date;
    stock?: number;
    type?: string;
}