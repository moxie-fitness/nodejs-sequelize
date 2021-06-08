export default class Result {
  constructor(success, payload, msg) {
    this.success = success || false;
    this.message = msg || 'n/a';
    this.payload = payload || {};
  }
}
