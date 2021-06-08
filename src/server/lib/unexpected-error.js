export default class UnexpectedError {
  constructor(description, status) {
    this.title = this.constructor.name;

    this.description = description || 'n/a';

    this.status = status || 503;
  }
}
