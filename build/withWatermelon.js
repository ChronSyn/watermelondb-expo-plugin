"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const android_1 = __importDefault(require("./SDK/52/android"));
const args = (0, minimist_1.default)(process.argv.slice(2));
//@ts-ignore
exports.default = (config, options) => {
    const PLATFORM = args.platform;
    switch (config.sdkVersion) {
        case '52.0.0':
            if (PLATFORM === 'android') {
                return (0, android_1.default)(config, options);
            }
        case '51.0.0':
            if (PLATFORM === 'android') {
                return (0, android_1.default)(config, options);
            }
        case '50.0.0':
            if (PLATFORM === 'android') {
                return (0, android_1.default)(config, options);
            }
        default:
            if (PLATFORM === 'android') {
                return (0, android_1.default)(config, options);
            }
    }
};
