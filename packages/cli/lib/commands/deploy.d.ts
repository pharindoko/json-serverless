import { Command, flags } from '@oclif/command';
export declare class Deploy extends Command {
    static description: string;
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        name: flags.IOptionFlag<string>;
        readonly: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        swagger: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
        apikeyauth: import("@oclif/parser/lib/flags").IBooleanFlag<boolean>;
    };
    static args: {
        name: string;
        required: boolean;
        description: string;
        hidden: boolean;
    }[];
    run(): Promise<void>;
}
