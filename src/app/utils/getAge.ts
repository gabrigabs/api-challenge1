export const getAge = (date: Date) => {
    const today = new Date();
    const clientBirth = new Date(date);

    let clientAge = today.getFullYear() - clientBirth.getFullYear();
    const clientMonth = today.getMonth() - clientBirth.getMonth();

    if (clientMonth < 0) {
        clientAge -= 1;
    }

    return clientAge;
};
