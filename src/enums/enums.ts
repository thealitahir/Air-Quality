const enum PostgreStatusCode {
  InternalServerError = 500,
  ForbiddenError = 403,
  AuthorizationError = 400,
  NotFoundError = 404,
  SuccessCode = 200,
}

const enum IQ_AIR_STATUSES {
  success = "success",
}

const enum ServerStatus {
  success = "Success",
  failure = "Failure"
}
export { PostgreStatusCode, IQ_AIR_STATUSES, ServerStatus };
