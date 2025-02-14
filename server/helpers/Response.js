class ApiUserResponse{
    constructor(status,data,token,success){
        this.status=status;
        this.data = data;
        this.token = token;
        this.success=success;
    }
}

class actionResponse{
    constructor(status,data,success){
        this.status=status;
        this.data = data;
        this.success = success;
    }
}

export {ApiUserResponse,actionResponse};