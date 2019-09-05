export declare class AppConfig {
    readOnly: boolean;
    enableSwagger: boolean;
    enableApiKeyAuth: boolean;
    jsonFile: string;
    enableJSONValidation: boolean;
    static merge: <T, U>(t: T, u: U) => {} & T & U;
}
