"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueCode = exports.streamToBuffer = exports.toBase64 = exports.getTransformResponseCallback = exports.getPropertyMetadata = exports.getValueOfSymbolKey = exports.deepLog = exports.isFalsy = exports.getNumberConfig = exports.getConfig = exports.getVariableName = exports.validateHash = exports.generateHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const class_transformer_1 = require("class-transformer");
const lodash_1 = __importDefault(require("lodash"));
const nanoid_1 = require("nanoid");
const stream_1 = require("stream");
const util_1 = __importDefault(require("util"));
function generateHash(password) {
    return bcrypt_1.default.hashSync(password, 10);
}
exports.generateHash = generateHash;
function validateHash(password, hash) {
    if (!password || !hash) {
        return Promise.resolve(false);
    }
    return bcrypt_1.default.compare(password, hash);
}
exports.validateHash = validateHash;
function getVariableName(getVar) {
    const m = /\(\)=>(.*)/.exec(getVar.toString().replace(/(\r\n|\n|\r|\s)/gm, ''));
    if (!m) {
        throw new Error("The function does not contain a statement matching 'return variableName;'");
    }
    const fullMemberName = m[1];
    const memberParts = fullMemberName.split('.');
    return memberParts[memberParts.length - 1];
}
exports.getVariableName = getVariableName;
function getConfig(name, defaultValue) {
    const value = process.env[name];
    if (value === undefined || value === '') {
        if (defaultValue === undefined) {
            throw new Error(`${name} environment variable is not set. Please check .env file`);
        }
        return defaultValue;
    }
    try {
        return JSON.parse(value);
    }
    catch (_a) {
        return value;
    }
}
exports.getConfig = getConfig;
function getNumberConfig(name, defaultValue) {
    const value = getConfig(name, defaultValue);
    try {
        return Number.parseInt(value, 10);
    }
    catch (_a) {
        throw new Error(`${name} environment variable must be number. Please check .env file`);
    }
}
exports.getNumberConfig = getNumberConfig;
function isFalsy(value) {
    return lodash_1.default.isNil(value) || value === '' || value === false;
}
exports.isFalsy = isFalsy;
function deepLog(data) {
    try {
        let obj = data;
        if (typeof data === 'object') {
            obj = JSON.stringify(data);
        }
        return util_1.default.inspect(obj, {
            showHidden: false,
            depth: null,
            colors: process.env.APP_ENV !== 'production',
        });
    }
    catch (_a) {
        return data;
    }
}
exports.deepLog = deepLog;
function getValueOfSymbolKey(obj, symbol) {
    const symbolKey = Reflect.ownKeys(obj).find((key) => key.toString() === symbol.toString());
    if (!symbolKey) {
        return;
    }
    return obj[symbolKey];
}
exports.getValueOfSymbolKey = getValueOfSymbolKey;
function getPropertyMetadata(key, target, propertyKey) {
    return Reflect.getMetadata(key, target, propertyKey);
}
exports.getPropertyMetadata = getPropertyMetadata;
function getTransformResponseCallback(cls) {
    return (data) => {
        try {
            const plain = JSON.parse(data);
            if (lodash_1.default.isArray(plain)) {
                return plain;
            }
            return (0, class_transformer_1.plainToClass)(cls, plain);
        }
        catch (_a) {
            return data;
        }
    };
}
exports.getTransformResponseCallback = getTransformResponseCallback;
function toBase64(seed) {
    return Buffer.from(seed).toString('base64');
}
exports.toBase64 = toBase64;
class BufferableStream extends stream_1.Writable {
    constructor(opts) {
        super(opts);
        this.chunks = [];
    }
    toBuffer() {
        return this.chunksToBuffer();
    }
    _write(chunk, _encoding, next) {
        this.chunks.push(chunk);
        next();
    }
    chunksToBuffer() {
        return Buffer.concat(this.chunks);
    }
}
async function streamToBuffer(stream) {
    const bufferableStream = new BufferableStream();
    return new Promise((resolve, reject) => {
        stream
            .on('error', (error) => {
            bufferableStream.emit('error', error);
        })
            .pipe(bufferableStream)
            .on('finish', () => {
            resolve(bufferableStream.toBuffer());
        })
            .on('error', (error) => {
            reject(error);
        });
    });
}
exports.streamToBuffer = streamToBuffer;
function generateUniqueCode(length = 6, alphabet = '1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM') {
    const nanoid = (0, nanoid_1.customAlphabet)(alphabet, length);
    return nanoid();
}
exports.generateUniqueCode = generateUniqueCode;
//# sourceMappingURL=utils.js.map