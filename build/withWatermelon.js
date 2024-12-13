"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const android_1 = __importDefault(require("./SDK/52/android"));
//@ts-ignore
exports.default = (config, options) => {
    console.log(config);
    switch (config.sdkVersion) {
        case '52.0.0':
            if (config.platform === 'android') {
                return (0, android_1.default)(config, options);
            }
        case '51.0.0':
            if (config.platform === 'android') {
                return (0, android_1.default)(config, options);
            }
        case '50.0.0':
            if (config.platform === 'android') {
                return (0, android_1.default)(config, options);
            }
        default:
            if (config.platform === 'android') {
                return (0, android_1.default)(config, options);
            }
    }
};
