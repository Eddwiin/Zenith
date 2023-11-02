import { ErrorAPI } from "@zenith/core/models/error-api";

export type MockErrorApi = Pick<ErrorAPI, 'err' | 'status'>