type priorityEnum = 'low' | 'medium' | 'high';
export interface Task {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    completed: boolean;
    priority: priorityEnum;
}