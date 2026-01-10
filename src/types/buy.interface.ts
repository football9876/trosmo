export interface Order{
    docId?:string,
    type:"product" | "ticket",
    id:string,
    quantity:number,
    price:number
    paid:boolean,
    createdAt:string,
    statusUpdatedAt:string,
    status:"pending" | "completed",
    userId:string,
    ticketId?:string,
    productId?:string,
    ticket?:Object,
    product?:Object
}