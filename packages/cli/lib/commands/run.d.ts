import { Command, flags } from '@oclif/command';
export declare class Run extends Command {
    static description: string;
    static flags: {
        help: import("@oclif/parser/lib/flags").IBooleanFlag<void>;
        env: flags.IOptionFlag<string>;
    };
    static args: {
        name: string;
        required: boolean;
        description: string;
        hidden: boolean;
    }[];
    run(): Promise<void>;
}
