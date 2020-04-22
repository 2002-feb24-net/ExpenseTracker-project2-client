export default interface Users {
    id?: number;
    name:string;  
    password:string;  
    email:string;  
    phoneNumber:string;  
    address:string;
    membership?:boolean;
}