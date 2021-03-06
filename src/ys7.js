const axios = require('axios');
const qs = require('querystring');
const API = require('./api');
const Camera = require('./camera');
const tool = require('./tool');

class Ys7 {

    static init(token) {
        return new Ys7(token);
    }

    constructor(token) {
        this.accessToken = token;
    }

    static async getToken(ak, sk) {
        const response = await axios.post(API.TOKEN, qs.stringify({
            appKey: ak,
            appSecret: sk
            }));
        if (response.data.code != 200) {
            throw  Error(response.data.msg);
        }
        return response.data.data;
    }

    async deviceList(pageStart = 0, pageSize = 10) {
        const response = await axios.post(API.DEVICE_QUERY.LIST, qs.stringify({
            accessToken: this.accessToken,
            pageStart,
            pageSize
        }));
        if (response.data.code != 200) {
            throw Error(response.data.msg);
        }
        return response.data.data;
    }

    async _listRequester(pageStart = 0, pageSize = 10, API) {
        const response = await axios.post(API, qs.stringify({
                accessToken: this.accessToken,
                pageStart,
                pageSize
            }
        ));
        if (response.data.code != 200) {
            throw  Error(response.data.msg);
        }
        return response.data.data;
    }

    async addDevice(deviceSerial, validateCode) {
        const response = await axios.post(API.DEVICE_MANAGER.ADD, qs.stringify({
                deviceSerial,
                validateCode,
                accessToken: this.accessToken
            }
        ));
        if (response.data.code != 200) {
            throw  Error(response.data.msg);
        }
        return response.data.data;
    }

    async removeDevice(deviceSerial) {
        const response = await axios.post(API.DEVICE_MANAGER.DELETE, qs.stringify({
                deviceSerial,
                accessToken: this.accessToken
            }
        ));
        if (response.data.code != 200) {
            throw  Error(response.data.msg);
        }
        return response.data.data;
    }

    async liveList(pageStart = 0, pageSize = 10) {
        return this._listRequester(pageStart, pageSize, API.LIVE.LIST)
    }

    async alarmList(pageStart = 0, pageSize = 10, startTime, endTime, alarmType, status) {
        const response = await axios.post(API.ALARM.ALL, qs.stringify({
                accessToken: this.accessToken,
                pageStart,
                pageSize,
                startTime,
                endTime,
                alarmType,
                status
            }
        ));
        if (response.data.code != 200) {
            throw  Error(response.data.msg);
        }
        return response.data.data;
    }

    getCamera(deviceSerial) {
        return new Camera(deviceSerial, this.accessToken);
    }

    async bodyCheck(dataType, image, operation='number'){
        const response = await axios.post(API.AI.BODY, qs.stringify({
            accessToken: this.accessToken,
            dataType,
            image,
            operation
        }));
        if (response.data.code != 200) {
            throw  Error(response.data.msg);
        }
        return response.data.data;
    }
}

module.exports = Ys7;


