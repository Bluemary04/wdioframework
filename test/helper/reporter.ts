import allure from '@wdio/allure-reporter';
import logger from './logger';

/**
 * Global reporter used to both logger and allure.
 * Currently added message goes as a arg to .addStep() of allure, add more params as required
 */

function addStep(testid: string, logLevel: string, message: string, toAllure = true, issueid = undefined) {
    let arr = ['info', 'debug', 'warn', 'error'];
    if(!testid) throw Error(`Invalid testid: ${testid} field to report step`);
    if(!message) throw Error(`Given message: ${message} is not valid to report`);
    if(!arr.includes(logLevel)) logger.error(`Given loglevel: ${logLevel} is invalid and should have in of these values ${arr}`);
    try {
        if (logLevel === 'info') logger.info(`[${testid}]: ${message}`);
        if (logLevel === 'debug') logger.debug(`[${testid}]: ${message}`);
        if (logLevel === 'warn') logger.warn(`[${testid}]: ${message}`);
        if (logLevel === 'error') {
            logger.error(`[${testid}]: ${message}`);
            allure.addStep(message, {}, 'failed');
        } else {
            if (toAllure) allure.addStep(message);
        }
        if (issueid) allure.addIssue(issueid);
    } catch (err) {
        throw Error(`Error reporting step, ${err}`)
    }
}

export default { addStep }