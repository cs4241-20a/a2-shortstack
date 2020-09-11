import { ServerResponse } from "http";
import { isReply, Message } from "../common/message.js";
import Model from "./model.js";
import { createEndpoint, fileEndpoint, getFormDataJson, jsonEndpoint, readBasicAuth, sendJson } from "./server.js";

function sendError(code: number, codeMeaning: string, message: string, res: ServerResponse) {
    sendJson({
        error: `${code} - ${codeMeaning}`,
        reason: message
    }, res, code);
}

const model = new Model();

createEndpoint("GET", "/", fileEndpoint("index.html"));

createEndpoint("GET", "/users/{}", (_, res, args) => {
    const user = model.getUser(args[0]);
    if (user === undefined) {
        return sendError(400, "Bad Request", `${args[0]} is not a registered user`, res);
    }
    sendJson(user, res);
});

createEndpoint("POST", "/users", async (req, res) => {
    const data = await getFormDataJson(req);
    if (!('username' in data)) {
        return sendError(400, "Bad Request", `Provided user is missing the "username" property`, res);
    }
    if (!('displayName' in data)) {
        return sendError(400, "Bad Request", `Provided user is missing the "displayName" property`, res);
    }
    if (!('hash' in data)) {
        return sendError(400, "Bad Request", `Provided user is missing the "hash" property`, res);
    }
    if (!model.createUser({ username: data['username'], displayName: data['displayName'] }, data['hash'])) {
        return sendError(409, "Conflict", `The user ${data['username']} already exists`, res);
    }
    return res.writeHead(200).end();
});

createEndpoint("GET", "/login", async (req, res) => {
    const auth = readBasicAuth(req);
    if (auth === undefined) {
        // No auth
        return sendError(401, "Unauthorized", `No Basic credentials were provided in the Authorization header`, res);
    }
    if (!model.authorize(...auth)) {
        // Bad auth
        return sendError(401, "Unauthorized", `The credentials provided were not recognized`, res);
    }
    return sendJson(model.getUser(auth[0]), res);
});

createEndpoint("GET", "/messages/all", jsonEndpoint(() => model.messages));
createEndpoint("GET", "/messages/root", jsonEndpoint(() => model.rootMessages.map(x => ({...x, popularity: model.getPopularity(x)}))));
createEndpoint("GET", "/messages/{}", (_, res, args) => {
    const msg = model.getMessage(+args[0]);
    if (msg === undefined) {
        return sendError(400, "Bad Request", `${args[0]} is not the ID of any message`, res);
    }
    if (isReply(msg)) {
        return sendJson(msg, res);
    }
    sendJson({...msg, popularity: model.getPopularity(msg)}, res);
});
createEndpoint("GET", "/messages/{}/replies", (_, res, args) => {
    const responseData = model.getRepliesTo(+args[0]);
    if (responseData === undefined) {
        return sendError(400, "Bad Request", `${args[0]} is not the ID of any root message`, res);
    }
    sendJson(responseData, res);
});

createEndpoint("POST", "/messages", async (req, res) => {
    const auth = readBasicAuth(req);
    if (auth === undefined) {
        // No auth
        return sendError(401, "Unauthorized", `No Basic credentials were provided in the Authorization header`, res);
    }
    if (!model.authorize(...auth)) {
        // Bad auth
        return sendError(401, "Unauthorized", `The credentials provided were not recognized`, res);
    }

    const data = await getFormDataJson(req);
    if ('content' in data) {
        if (typeof data['content'] !== 'string' || data['content'] === "") {
            // Uh no, no content
            return sendError(400, "Bad Request", "No content was provided to create the message", res);
        }
        
        // Finally, we can do something!
        let addedMsg: Message | undefined;
        if ('replyTo' in data) {
            if (!(addedMsg = model.addReply({
                content: data['content'],
                author: auth[0],
                replyTo: data['replyTo']
            }))) {
                return sendError(400, "Bad Request", `Could not reply to message ID ${data['replyTo']}`, res);
            }
        }
        else {
            addedMsg = model.addMessage({
                content: data['content'],
                author: auth[0]
            });
        }
        return sendJson(addedMsg!, res);
    }
    else {
        // Hey, this isn't a message! >:(
        return sendError(400, "Bad Request", `Provided message is missing the "content" property`, res);
    }
});


// Makes main count as a module.
export default undefined;