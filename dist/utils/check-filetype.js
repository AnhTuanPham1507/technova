"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfFileFilter = exports.imageFileFilter = void 0;
const common_1 = require("@nestjs/common");
const imageFileFilter = (req, file, callback) => {
    if (!/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(file.originalname)) {
        return callback(new common_1.ForbiddenException('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const pdfFileFilter = (req, file, callback) => {
    if (!/\.(pdf|xlsx|docs|PDF|XLSX|DOCS)$/.test(file.originalname)) {
        return callback(new common_1.ForbiddenException('Only pdf|xlsx|docs|PDF|XLSX|DOCS files are allowed!'), false);
    }
    callback(null, true);
};
exports.pdfFileFilter = pdfFileFilter;
//# sourceMappingURL=check-filetype.js.map