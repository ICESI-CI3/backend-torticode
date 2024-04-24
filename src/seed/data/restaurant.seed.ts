import { Restaurant } from "src/roles/entities/restaurant.entity";

export const restaurantSeed: Restaurant[] = [

    {
        id:21,
        email: 'restauranteBristo@gmail.com',
        password: 'BristoRestaurante1',
        balance:50000,
        role:'restaurant',
        createdAt: new Date().getTime(),
        deleteAt: null,
        reports: [],
        name: "Bristo",
        nit: 123456789,
        manager: "Gloria Gomez",
        phone: "3126779774",
        sales: [],
        news:[],
        products:[],
        supervisor: null,
    }


]