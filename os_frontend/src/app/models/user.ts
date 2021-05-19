export interface User {
    id?:number,
    first_name:string,
    last_name:string,
    username:string,
    address:string,
    dni?:string,
    email:string,
    passwd:string,
    type_user:number,
    photoURL?:string,
    cart?:[{
        nameP:string,
        priceP:number,
        descriptionP:string,
        dateAdd:Date
    }]
}
