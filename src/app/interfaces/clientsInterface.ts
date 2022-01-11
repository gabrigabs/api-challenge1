enum Genero {
  masculino = 'Masculino',
  feminino = 'Feminino',
  outro = 'Outro'
}

export default interface Client {
  id: string;
  nome_completo: string;
  genero: Genero;
  data_nascimento: Date;
  id_cidade?: string;
  idade: number;
  localizacao: {
    cidade: string;
    estado: string;
  };
}
