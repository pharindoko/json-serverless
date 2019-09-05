import express from 'express';
import { SwaggerConfig } from './swagger.config';
import { ApiSpecification } from '../apispecification';
export declare class Swagger implements ApiSpecification {
    private swaggerSpec;
    private swaggerDefGen;
    private logger;
    private spec;
    private server;
    private config;
    private basePath;
    constructor(server: express.Express, config: SwaggerConfig, basePath: string);
    generateSpecification: (json: object, regenerate: boolean) => void;
}
