import { ModuleWithProviders } from '@angular/core';

export interface IRobot {
    id?: string;
    code: string;
    name: string;
    description: string;
    price: number;
}

export interface IRouting {
    routes: ModuleWithProviders,
    components: any[]
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export interface IRobotResponse {
    status: boolean;
    robot: IRobot;
}
