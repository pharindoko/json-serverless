import { AppConfig } from './app.config';
import * as lowdb from 'lowdb';
import express from 'express';
import { StorageAdapter } from '../storage/storage';
import { ApiSpecification } from '../specifications/apispecification';
export declare class CoreApp {
    storageAdapter: StorageAdapter;
    static storage: lowdb.AdapterAsync<any>;
    static adapter: lowdb.LowdbAsync<{}>;
    logger: any;
    appConfig: AppConfig;
    protected server: express.Express;
    private apispec;
    constructor(appConfig: AppConfig, server: express.Express, storageAdapter: StorageAdapter, apispec: ApiSpecification);
    setup(): Promise<void>;
    protected setupStorage(): Promise<void>;
    protected setupApp(): Promise<void>;
    protected validateJSON(db: {}): boolean;
    protected getJSON(): Promise<object>;
    protected setupSwagger(db: {}): void;
    protected setupRoutes(): void;
    protected initializeLayers(): Promise<{
        middlewares: express.RequestHandler[];
        router: express.Router;
    }>;
    protected setupServer(middlewares: express.Handler[], router: express.Router): void;
}
