"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
let CloudinaryService = class CloudinaryService {
    constructor() { }
    uploadFiles(files) {
        const uploadImagePromises = files.map(file => new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream((error, result) => {
                if (error || !result)
                    return reject(error);
                resolve(result);
            });
            streamifier_1.default.createReadStream(file.buffer).pipe(uploadStream);
        }));
        return Promise.all(uploadImagePromises);
    }
    deleteFile(cloudinaryId) {
        return cloudinary_1.v2.uploader.destroy(cloudinaryId);
    }
};
CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CloudinaryService);
exports.CloudinaryService = CloudinaryService;
//# sourceMappingURL=cloudinary.service.js.map