export interface Task {
    id: number;
    title: string;
    description: string;
    category: string;
    priority: string;
    done: boolean;

    startTime: string | null;
    endTime: string | null;
    duration: number;
}


export const initialTasks: Task[] = [
    {
        id: 1,
        title: "Preparar classe Ionic",
        description: "Preparar exemples",
        category: "UVIC",
        priority: "Alta",
        done: false,
        startTime: null,
        endTime: null,
        duration: 0
    },
    {
        id: 2,
        title: "Corregir pràctiques d'Angular",
        description: "Revisar els lliuraments del grup B i posar les notes",
        category: "UVIC",
        priority: "Alta",
        done: false,
        startTime: null,
        endTime: null,
        duration: 0
    },
    {
        id: 3,
        title: "Reunió amb el tutor del TFG",
        description: "Preparar l'esquema de la memòria i els dubtes",
        category: "Estudis",
        priority: "Mitjana",
        done: false,
        startTime: null,
        endTime: null,
        duration: 0
    },
    {
        id: 4,
        title: "Anar al gimnàs",
        description: "Rutina de força: pit i esquena",
        category: "Personal",
        priority: "Baixa",
        done: true,
        startTime: null,
        endTime: null,
        duration: 0
    },
    {
        id: 5,
        title: "Fer la compra setmanal",
        description: "Fruita, verdura i productes de neteja",
        category: "Personal",
        priority: "Baixa",
        done: false,
        startTime: null,
        endTime: null,
        duration: 0
    }
];