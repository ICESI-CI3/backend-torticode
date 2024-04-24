import { Restaurant } from "src/roles/entities/restaurant.entity";
import { Student } from "src/roles/entities/student.entity";
import { Supervisor } from "src/roles/entities/supervisor.entity";

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
    },
    {
        id:13,
        email: 'diegomartinez@gmail.com',
        password: 'Diegomartinez1',
        balance:50000,
        role:'student',
        createdAt: new Date().getTime(),
        deleteAt: null,
        reports: [],
        name: "Diego",
        lastname: "Martinez",
        dni:11334455,
        code: "A00377777",
        program: "Ing. de Sistemas",
        sales: [],
        supervisor: supervisor
    },    
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


