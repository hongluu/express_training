export default class BaseApi {
    constructor(logger) {
        this.logger = logger;
    }

    _send(res, status, message, data) {
        res.status(status).send({
            status: status,
            message: message,
            data: data
        });
    }
    _removeUnuseAtrr(data) {
        delete data._id;
        delete data.__v;
    }
}