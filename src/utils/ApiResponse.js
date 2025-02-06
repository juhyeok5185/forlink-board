class ApiResponse {
    constructor(status = 200, message = "Api Success", data = null) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    static success(data, message = "Api Success") {
        return new ApiResponse(200, message, data);
    }

    static failure(message = "Api Failure", status = 500) {
        return new ApiResponse(status, message, null);
    }
}

module.exports = ApiResponse;
