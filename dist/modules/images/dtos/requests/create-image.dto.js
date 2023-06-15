"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateImageDTO = void 0;
const openapi = require("@nestjs/swagger");
class CreateImageDTO {
    static _OPENAPI_METADATA_FACTORY() {
        return { filename: { required: true, type: () => String }, fieldname: { required: true, type: () => String }, mimetype: { required: true, type: () => String }, originalname: { required: true, type: () => String }, encoding: { required: true, type: () => String }, stream: { required: true, type: () => require("stream").Readable }, destination: { required: true, type: () => String }, size: { required: true, type: () => Number }, path: { required: true, type: () => String }, buffer: { required: true, type: () => Object }, objectId: { required: true, type: () => String } };
    }
}
exports.CreateImageDTO = CreateImageDTO;
//# sourceMappingURL=create-image.dto.js.map