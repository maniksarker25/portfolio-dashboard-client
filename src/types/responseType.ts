export type ApiError = {
  status: number;
  data: {
    success: boolean;
    errorDetails: object;
    message: string;
    errorMessage: string;
    stack: string;
  };
};
