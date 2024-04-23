import { Supervisor } from "src/roles/entities/supervisor.entity";


export const supervisorSeed:Supervisor[] = [
    {
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
];