export default class AlreadyExists extends Error {
  description: string;

  constructor(item: string) {
    super();
    this.description = 'BadRequest';
    this.message = item;
  }
}
