import { New } from "src/news/entities/new.entity";
import { Product } from "src/products/entities/product.entity";
import { Restaurant } from "src/roles/entities/restaurant.entity";
import { Student } from "src/roles/entities/student.entity";
import { Supervisor } from "src/roles/entities/supervisor.entity";
import { SaleDetail } from "src/sale-details/entities/sale-detail.entity";
import { Sale } from "src/sales/entities/sale.entity";

const supervisor:Supervisor = new Supervisor();
supervisor.id=1
supervisor.email= 'supervisor@gmail.com'
supervisor.password= 'Supervisor1'
supervisor.balance=50000
supervisor.role='supervisor'
supervisor.createdAt= new Date().getTime()
supervisor.deleteAt= null
supervisor.reports= []
supervisor.name= 'John'
supervisor.lastname='Due'
supervisor.dni= 12345678

const studentSeed:Student[] = [
    {
        id:12,
        email: 'juanaperez@gmail.com',
        password: 'Juanaperez1',
        balance:50000,
        role:'student',
        createdAt: new Date().getTime(),
        deleteAt: null,
        reports: [],
        name: "Juana",
        lastname: "Perez",
        dni:11223344,
        code: "A00377995",
        program: "Ing. de Sistemas",
        sales: [],
        supervisor: supervisor
    }
]
supervisor.students=studentSeed


const restaurantSeed: Restaurant[] = [

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
        supervisor: supervisor,
    }
]

supervisor.restaurants=restaurantSeed

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

const finalSupervisor = supervisor; 

export{finalSupervisor, studentSeed, restaurantSeed, productsSeed, news};

