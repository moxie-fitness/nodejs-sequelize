export default class PermError {
  constructor(description, status) {
    this.title = this.constructor.name;

    this.description = description || 'n/a';

    this.status = status || 501;
  }
}
