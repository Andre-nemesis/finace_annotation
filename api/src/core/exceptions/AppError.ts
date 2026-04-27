class AppError extends Error {
    public readonly status: number;
    public readonly message: string;
    public readonly details: any;

    constructor(message: string, status: number, details: any = null){
        super(message);
        this.status = status;
        this.message = message;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;