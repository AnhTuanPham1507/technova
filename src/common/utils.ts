/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import type { ClassConstructor } from 'class-transformer';
import { plainToClass } from 'class-transformer';
import _ from 'lodash';
import { customAlphabet } from 'nanoid';
import type { WritableOptions } from 'stream';
import { Writable } from 'stream';
import util from 'util';

/**
 * generate hash from password or string
 * @param {string} password
 * @returns {string}
 */
export function generateHash(password: string): string {
  return bcrypt.hashSync(password, 10);
}

/**
 * validate text with hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export function validateHash(
  password: string | undefined,
  hash: string | undefined,
): Promise<boolean> {
  if (!password || !hash) {
    return Promise.resolve(false);
  }

  return bcrypt.compare(password, hash);
}

export function getVariableName<TResult>(getVar: () => TResult): string {
  const m = /\(\)=>(.*)/.exec(
    getVar.toString().replace(/(\r\n|\n|\r|\s)/gm, ''),
  );

  if (!m) {
    throw new Error(
      "The function does not contain a statement matching 'return variableName;'",
    );
  }

  const fullMemberName = m[1];

  const memberParts = fullMemberName.split('.');

  return memberParts[memberParts.length - 1];
}

export function getConfig(name: string, defaultValue?: any) {
  const value = process.env[name];

  if (value === undefined || value === '') {
    if (defaultValue === undefined) {
      throw new Error(
        `${name} environment variable is not set. Please check .env file`,
      );
    }

    return defaultValue;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export function getNumberConfig(name: string, defaultValue?: any): number {
  const value = getConfig(name, defaultValue);

  try {
    return Number.parseInt(value as string, 10);
  } catch {
    throw new Error(
      `${name} environment variable must be number. Please check .env file`,
    );
  }
}

export function isFalsy(value: any): boolean {
  return _.isNil(value) || value === '' || value === false;
}

export function deepLog(data: any): string {
  try {
    let obj = data;

    if (typeof data === 'object') {
      obj = JSON.stringify(data);
    }

    return util.inspect(obj, {
      showHidden: false,
      depth: null,
      colors: process.env.APP_ENV !== 'production',
    });
  } catch {
    return data;
  }
}

export function getValueOfSymbolKey<V>(
  obj: Record<string | symbol, V>,
  symbol: symbol,
) {
  const symbolKey = Reflect.ownKeys(obj).find(
    (key) => key.toString() === symbol.toString(),
  );

  if (!symbolKey) {
    return;
  }

  return obj[symbolKey];
}

export function getPropertyMetadata(
  key: symbol | string,
  target: any,
  propertyKey: string,
) {
  //eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Reflect.getMetadata(key, target, propertyKey);
}

export function getTransformResponseCallback<T>(cls: ClassConstructor<T>) {
  return (data): T => {
    try {
      //eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const plain = JSON.parse(data);

      if (_.isArray(plain)) {
        return plain as any;
      }

      return plainToClass(cls, plain);
    } catch {
      return data;
    }
  };
}

export function toBase64(seed: string): string {
  return Buffer.from(seed).toString('base64');
}

class BufferableStream extends Writable implements IBufferable {
  private readonly chunks: any[];

  constructor(opts?: WritableOptions) {
    super(opts);
    this.chunks = [];
  }

  toBuffer(): Buffer {
    return this.chunksToBuffer();
  }

  _write(
    chunk: any,
    _encoding: string,
    next: (error?: Error | null) => void,
  ): void {
    this.chunks.push(chunk);
    next();
  }

  private chunksToBuffer(): Buffer {
    return Buffer.concat(this.chunks);
  }
}

export async function streamToBuffer(
  stream: NodeJS.ReadableStream,
): Promise<Buffer> {
  const bufferableStream = new BufferableStream();

  return new Promise(
    (resolve: (data: Buffer) => void, reject: (error: Error) => void): void => {
      stream
        .on('error', (error: Error): void => {
          bufferableStream.emit('error', error);
        })
        .pipe(bufferableStream)
        .on('finish', (): void => {
          resolve(bufferableStream.toBuffer());
        })
        .on('error', (error: Error): void => {
          reject(error);
        });
    },
  );
}

interface IBufferable {
  toBuffer(): Buffer;
}

/**
 *
 * @param length Size of result code. Default is 6
 * @param alphabet Alphabet used to generate code. Default is  '1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM'
 * @returns A random code
 */
export function generateUniqueCode(
  length = 6,
  alphabet = '1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM',
): string {
  const nanoid = customAlphabet(alphabet, length);

  return nanoid();
}
