export default class MyError extends Error {

    statusCode: number;

    constructor(code: number, message: string, callstack?: any) {

        super(message);

        this.name = "CustomError";
        this.statusCode = code;

        if (callstack !== undefined) {
            this.stack = callstack;
        } else {
            this.stack = undefined;
        }
    }
}