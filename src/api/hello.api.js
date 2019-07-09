import BaseApi from './base.api';

export default class HelloApi extends BaseApi {
    get = (req, res, next) => {
        this._send(res, 200, "Hello");
    }
    add = (req, res, next) => {
        this._send(res, 200, "Hello");
    }
    update = (req, res, next) => {
        this._send(res, 200, "Hello");
    }
    remove = (req, res, next) => {
        this._send(res, 200, "Hello");
    }
}
