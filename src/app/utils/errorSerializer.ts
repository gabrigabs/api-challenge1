export const serializer = (error: any) => {
    const formatedError = error.details.map((details: any) => ({
        description: details.context.label,
        message: details.message
    }));
    return formatedError;
};
