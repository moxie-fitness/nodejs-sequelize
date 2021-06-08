export default class RolesError extends Error {
  constructor(message, status) {
    super(message);

    this.type = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);

    this.status = status || 502;
  }
}
