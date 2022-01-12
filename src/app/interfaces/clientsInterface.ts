import { Gender } from '../utils/genderEnum';

export default interface Client {
    id: string;
    nome_completo: string;
    genero: Gender;
    data_nascimento: Date;
    id_cidade?: string;
    idade: number;
    localizacao: {
        cidade: string;
        estado: string;
    };
}
