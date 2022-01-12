import { Client } from '../interfaces';

const clientSerializer = ({ id, nome_completo, idade, genero, data_nascimento, localizacao }: Client) => {
    const { cidade, estado } = localizacao;
    return {
        id,
        nome_completo,
        genero,
        data_nascimento,
        idade,
        localizacao: {
            cidade,
            estado
        }
    };
};

export default clientSerializer;
