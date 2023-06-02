import { getValueOfSymbolKey } from '@common/utils';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';

export class LogProvider {
  static getLoggerService() {
    const logFormat = format.combine(
      format.colorize({ all: process.env.APP_ENV === 'development' }),
      format.timestamp(),
      format.printf(
        (msg) =>
          `${msg.timestamp} [${getValueOfSymbolKey(
            msg,
            Symbol.for('level'),
          )}] - [${msg.context}] ${msg.message}`,
      ),
    );

    return WinstonModule.createLogger({
      exitOnError: false,
      format: logFormat,
      levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
      },
      transports: [
        new transports.Console({
          format: format.combine(format.colorize()),
          level: process.env.APP_ENV === 'production' ? 'info' : 'debug',
        }),
      ],
    });
  }
}
