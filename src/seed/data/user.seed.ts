import { New } from "src/news/entities/new.entity";
import { Product } from "src/products/entities/product.entity";
import { Restaurant } from "src/roles/entities/restaurant.entity";
import { Student } from "src/roles/entities/student.entity";
import { Role } from "src/roles/enum/role.enum";

const studentSeed:Student[] = [
    {
        id:12,
        email: 'juanaperez@gmail.com',
        password: '$2b$10$VqUKHZK/fAGX/B6qppXUsO2.ORekP6xAULHr6E3hUgdz4.yEYmQrC',
        balance:50000,
        role: Role.STUDENT,
        createdAt: new Date().getTime(),
        deleteAt: null,
        name: "Juana",
        lastname: "Perez",
        dni:11223344,
        code: "A00377995",
        program: "Ing. de Sistemas",
        sales: [],
    }
]

const restaurantSeed: Restaurant[] = [

    {
        id:21,
        email: 'restauranteBristo@gmail.com',
        password: '$2b$10$VqUKHZK/fAGX/B6qppXUsO2.ORekP6xAULHr6E3hUgdz4.yEYmQrC',
        balance:50000,
        role:Role.RESTAURANT,
        createdAt: new Date().getTime(),
        deleteAt: null,
        name: "Bristo",
        nit: 123456789,
        manager: "Gloria Gomez",
        phone: "3126779774",
        news:[],
        products:[],
    }
]

const productsSeed: Product[] = [
    {
        id:1,
        name:"Almuerzo del día",
        description:"Arroz, carne, ensalada",
        price: 10000,
        stock: 100,
        image: "https://images.pexels.com/photos/3690/food-restaurant-hand-dinner.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        createdAt: new Date().getTime(),
        deletedAt: null,
        saleDetails: null,
        restaurant: restaurantSeed[0]
    },
    {
        id:2,
        name:"Helado nucita",
        description:"Helado de nucita",
        price: 2000,
        stock: 50,
        image:"https://images.pexels.com/photos/1233258/pexels-photo-1233258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        createdAt: new Date().getTime(),
        deletedAt: null,
        saleDetails: null,
        restaurant: restaurantSeed[0]
    }
]

restaurantSeed[0].products=productsSeed

const news:New[]=[
    {
        id:1,
        title:"Nuevo plato del día",
        description:"Hoy tenemos un nuevo plato del día",
        image:"https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        createdAt: new Date().getTime(),
        deletedAt: null,
        restaurant: restaurantSeed[0]
    },
    {
        id:2,
        title:"Nuevo postre",
        description:"Hoy tenemos un nuevo postre",
        image:"https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        createdAt: new Date().getTime(),
        deletedAt: null,
        restaurant: restaurantSeed[0]
    }
]

restaurantSeed[0].news=news


export{studentSeed, restaurantSeed, productsSeed, news};

