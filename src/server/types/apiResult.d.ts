import { BackendError } from './backendError';

export interface ApiResult {
    success: boolean;
    error?: BackendError;
    data?: any;
}
