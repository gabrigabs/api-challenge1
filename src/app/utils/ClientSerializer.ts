import { Client } from '../interfaces';

const clientSerializer = ({ id, full_name, age, gender, birthdate, location }: Client) => {
    const { city, state } = location;
    return {
        id,
        full_name,
        gender,
        birthdate,
        age,
        location: {
            city,
            state
        }
    };
};

export default clientSerializer;
