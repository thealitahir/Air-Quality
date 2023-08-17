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

const enum LatLngData {
  lat = "48.856613",
  lng = "2.352222"
}
export { PostgreStatusCode, IQ_AIR_STATUSES, ServerStatus, LatLngData };
