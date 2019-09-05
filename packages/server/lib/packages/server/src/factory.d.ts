import express from 'express';
import { CoreApp, AppConfig } from './app';
import { StorageAdapter } from './storage';
import { ApiSpecification } from './specifications';
import { CoreServer } from './coreserver/server';
import { Environment } from './environment';
export declare class ServerFactory {
    static createServer: (type: string, server: express.Express, appConfig: AppConfig) => Promise<CoreServer>;
    static create<C extends CoreServer, A extends CoreApp, E extends Environment, S extends StorageAdapter>(coreserver: {
        new (server: express.Express, app: A): C;
    }, app: {
        new (appConfig: AppConfig, server: express.Express, storage: S, specification: ApiSpecification): A;
    }, environment: {
        new (): E;
    }, storage: S, appConfig: AppConfig, server: express.Express): C;
}
