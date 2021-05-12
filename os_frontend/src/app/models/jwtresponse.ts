export interface JwtResponse {
    dataUser:{
        id:number,
        name:string,
        email:string,
        accesToken:string,
        expiresIn:string,
    }
}
