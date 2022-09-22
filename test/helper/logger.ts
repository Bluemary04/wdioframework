import winston from 'winston';

// Format console.log
const consoleFormat = winston.format.printf(({ level, message
}) => {
    const logLevel = winston.format.colorize().colorize(level, `${level.toUpperCase()}`);
    return `[${logLevel}]: ${message}`;
})

// Create loger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
        level: process.env.LOG_LEVEL,
        handleExceptions: true,
        format: winston.format.combine(winston.format.timestamp(), consoleFormat)
    })
  ],
});

// Print any unknown issues
logger.on("error", error =>{
    console.log("Unknown error in Winston logger");
    console.log(error.message);
});
export default logger;