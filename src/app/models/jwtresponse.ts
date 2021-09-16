export interface JwtResponse {
        id:number,
        name:string,
        username?:string,
        email:string,
        accesToken:string,
        expiresIn:string,
        login:boolean
}
