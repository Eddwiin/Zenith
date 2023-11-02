import { HttpErrorResponse } from "@angular/common/http"

export interface ErrorAPI extends HttpErrorResponse  {
    err: {
        message?: string | null
    } | null
}