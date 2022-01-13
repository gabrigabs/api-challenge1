import { Gender } from '../utils/genderEnum';

export default interface Client {
    id: string;
    full_name: string;
    gender: Gender;
    birthdate: Date;
    city_id?: string;
    age: number;
    location: {
        city: string;
        state: string;
    };
}
