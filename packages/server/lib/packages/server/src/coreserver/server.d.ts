import express from 'express';
import { CoreApp } from '../app/core.app';
export declare abstract class CoreServer {
    core: CoreApp;
    server: express.Express;
    constructor(server: express.Express, core: CoreApp);
    abstract init(): Promise<void>;
    protected start(server: express.Express, port: number): void;
}
