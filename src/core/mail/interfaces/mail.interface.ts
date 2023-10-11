interface IMailParams<C, S> {
    content?: C;
    subject?: S;
}
export interface IMailOption<C, S> {
    params?: IMailParams<C, S>;
}

export interface IMailContent {
    content: string;
}

export interface IMailParamsAccountActivation {
    username: string;
    activationLink: string;
}

export abstract class MailAbstract {
    protected readonly client;
    send() {}
}
