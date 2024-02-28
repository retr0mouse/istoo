export class BackendError extends Error {
    errorCode?: number;

    constructor(message: string, errorCode?: number) {
        super(message);
        this.errorCode = errorCode;
        this.name = 'BackendError';
    }

    static fromError(error: Error, errorCode: number): BackendError {
        const backendError = new BackendError(error.message, errorCode);
        backendError.stack = error.stack;
        return backendError;
    }
}