import express from 'express';
import { Spec, Schema, ApiKeySecurity, QueryParameter, Reference } from 'swagger-schema-official';
export declare class SwaggerSpec {
    private packageJsonPath;
    private packageInfo;
    private app;
    private predefinedSpec;
    private spec;
    constructor();
    private updateSpecFromPackage;
    private sortObject;
    initSpec(readOnly: boolean, basePath: string): Spec;
    getSpec: (app: express.Express, predefinedSpec: object, readOnly: boolean, basePath: string) => Spec;
    setSchemaReference(spec: Spec, definition: string): Reference;
    private getDefaultParameterSchema;
    getQueryParameterSchema(): QueryParameter[];
    private getDefaultPostResponses;
    private getDefaultPutResponses;
    private getDefaultDeleteResponses;
    private getDefaultSchemaProperties;
    addSchemaDefitions: (specificaton: Spec, schemaDefinitons: Schema) => Spec;
    addAuthentication: (specificaton: Spec, auth: ApiKeySecurity) => {
        [securityDefinitionName: string]: import("swagger-schema-official").Security;
    } & ApiKeySecurity;
}
