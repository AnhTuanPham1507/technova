/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ForbiddenException } from '@nestjs/common';

export const imageFileFilter = (req, file, callback) => {
  if (!/\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(file.originalname)) {
    return callback(
      new ForbiddenException('Only image files are allowed!'),
      false,
    );
  }

  callback(null, true);
};

export const pdfFileFilter = (req, file, callback) => {
  if (!/\.(pdf|xlsx|docs|PDF|XLSX|DOCS)$/.test(file.originalname)) {
    return callback(
      new ForbiddenException(
        'Only pdf|xlsx|docs|PDF|XLSX|DOCS files are allowed!',
      ),
      false,
    );
  }

  callback(null, true);
};
