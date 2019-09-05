import express from 'express';
import { AppConfig } from './app/app.config';
export declare const startServer: (environment: string, server: express.Express, appConfig: AppConfig) => Promise<void>;
