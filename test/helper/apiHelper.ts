import request from "supertest";
import reporter from "../helper/reporter";

const GET = async (testid: string, baseUrl: string, endpoint: string, authToken: string, queryParam: object) => {
    if(!baseUrl || !endpoint) throw new Error(`given values - baseUrl: ${baseUrl} , endpoint: ${endpoint} are not valid`);
    baseUrl = baseUrl.trim();
    endpoint = endpoint.trim();
    reporter.addStep(testid, "info", `Making a GET to ${endpoint}`) 
    try {
        return await request(baseUrl)
        .get(endpoint)
        .query(queryParam)
        .auth(authToken, {type: "bearer"})
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
    } catch (err) {
        err.message = `Error makin GET call to: ${endpoint}, ${err}`;
        throw err;
    }
}

const POST = async (testid: string, baseUrl: string, endpoint: string, authToken: string, payload: object) => {
    if(!baseUrl || !endpoint) throw new Error(`given values - baseUrl: ${baseUrl} , endpoint: ${endpoint} are not valid`);
    baseUrl = baseUrl.trim();
    endpoint = endpoint.trim();
    reporter.addStep(testid, "info", `Making a POST to ${endpoint}`) 
    try {
        return await request(baseUrl)
        .post(endpoint)
        .auth(authToken, {type: "bearer"})
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(payload)
    } catch (err) {
        err.message = `Error makin POST call to: ${endpoint}, ${err}`;
        throw err;
    }
}

export default {GET, POST}