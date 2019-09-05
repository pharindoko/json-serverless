import { CloudApp } from '../app';
import { CoreServer } from './server';
import express from 'express';
export declare class CloudServer extends CoreServer {
    core: CloudApp;
    constructor(server: express.Express, core: CloudApp);
    init(): Promise<void>;
}
