export enum OpsType {
    ADD = 'add',
    INC = 'inc',
    DEC = 'dec',
    REMOVE = 'remove',
    CLEAR = 'clear',
    SEND = 'send-contact',
}

export type Operations = {
    operations: OpsType;
}