import { Readable } from "stream";
export class CreateImageDTO {
    filename: string;
    fieldname: string;
    mimetype: string;
    originalname: string;
    encoding: string;
    stream: Readable;
    destination: string;
    size: number;
    path: string;
    buffer: Buffer;
    objectId: string;
}