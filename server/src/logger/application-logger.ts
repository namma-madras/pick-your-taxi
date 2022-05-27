import Logger from "./logger";

interface RequestOptions {
  id: string,
  status: string,
  method: string,
  params: any,
  url: string
}

class ApplicationLogger extends Logger {
  constructor(){
    super({
      filename: `${process.env.NODE_ENV}.log`,
      metaData: {
        service: 'application'
      }
    })
  }

  logToConsole(message: string){
    console.log(`[${this.dateTime()}] ${message}`)
  }

  logInfo(message: string){
    this.logToConsole(message)
    this.log({
      level: 'info',
      message: message
    })
  }

  logRequest(requestOptions: RequestOptions){
    this.logToConsole(`[${requestOptions.id}] method:${requestOptions.method} params:${JSON.stringify(requestOptions.params)} url: ${requestOptions.url} status: ${requestOptions.status}`)
    this.log({
      level: 'info',
      message: `[${requestOptions.id}] Request`,
      metaData: requestOptions
    })
  }
}

export default new ApplicationLogger();