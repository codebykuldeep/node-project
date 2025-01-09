class ApiUserResponse{
    constructor(status,data,token){
        this.status=status;
        this.data = data;
        this.token = token;
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