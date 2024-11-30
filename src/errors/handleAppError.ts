import { TGenericErrorResponse } from '../interfaces/error';
import ApiError from './ApiError';

const handleApiError = (error: ApiError): TGenericErrorResponse => {
  return {
    statusCode: error.statusCode,
    message: 'App Error.',
    errorDetails: error.message,
  };
};
export default handleApiError;
