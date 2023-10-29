export interface ErrorAPI {
    err: {
        message?: string | null,
        statusCode?: number
    }
}