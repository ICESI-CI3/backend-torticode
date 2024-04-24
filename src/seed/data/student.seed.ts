import { Student } from "src/roles/entities/student.entity";


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
        supervisor: null
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
        supervisor: {
            id:1,
            email: 'supervisor@gmail.com',
            password: 'Supervisor1',
            balance:50000,
            role:'supervisor',
            createdAt: new Date().getTime(),
            deleteAt: null,
            reports: [],
            name: 'John',
            lastname: 'Due',
            dni: 12345678,
            students: [],
            restaurants: []
        }
    },

    
]
