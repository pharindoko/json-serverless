import { CoreServer } from './server';
import { CloudApp } from '../app';
import express from 'express';
export declare class DevServer extends CoreServer {
    core: CloudApp;
    constructor(server: express.Express, core: CloudApp);
    init(): Promise<void>;
}
