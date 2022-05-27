import winston from 'winston';

interface loggerConfiguration {
  filename: string,
  metaData: any
}

class Logger {
  public logger;
  constructor(loggerConfiguration: loggerConfiguration){
    this.logger = winston.createLogger({
      format: winston.format.json(),
      defaultMeta: loggerConfiguration.metaData,
      transports: [
        new winston.transports.File({
          filename: `./src/log/${loggerConfiguration.filename}`,
        })
      ]
    })
  }

  dateTime(){
    const current_datetime = new Date();
    const formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();
    return formatted_date
  }

  log({ level, message, metaData = {} } : { level: string, message: string, metaData?: object }){
    const dataToLog = {
      ...metaData,
      level: level,
      datetime: this.dateTime(),
      message: message
    }
    this.logger.log(dataToLog)
  }
}

export default Logger;