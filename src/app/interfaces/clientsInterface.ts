enum Sexo {
  masculino = 'Masculino',
  feminino = 'Feminino',
  outro = 'Outro',
}

export default interface Client {
  id: string
  nome_completo: string
  sexo : Sexo
  data_nascimento: Date,
  idade: number
  localizacao:{
    cidade: string,
    estado: string
  }
}
