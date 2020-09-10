import { IncomingMessage, ServerResponse, createServer } from 'http';
import fs from 'fs';
import mime from 'mime';
import path from 'path';
import url from 'url';

// @ts-ignore
const BASE_PATH = path.join(path.dirname(url.fileURLToPath(import.meta.url)), "../../");
const PUBLIC = path.join(BASE_PATH, "./dist/public");
const PORT = process.env.PORT || 3000;

export const server = createServer((request, response) => {
    try {
        if (request.method === 'GET') {
            handleGet(request, response);
        } else if (request.method === 'POST') {
            handlePost(request, response);
        }
    }
    catch(e) {
        // Something broke
        console.error(e);
    }
});


interface RequestHandler {
    endpoint: string[];
    listener: (req: IncomingMessage, res: ServerResponse, args: string[]) => void;
}

const requestHandlers = {GET: [], POST: []} as {
    GET: RequestHandler[],
    POST: RequestHandler[]
};

/** 
 * Creates an endpoint.
 * 
 * `{}` can be used for endpoint arguments, e.g. `GET /foo/{}`.
 * A caveat of note is that `GET /foo/bar` must be created before `GET /foo/{}` in order for `GET /foo/bar` to be acessible.
 */
export function createEndpoint(method: keyof typeof requestHandlers, endpoint: string, listener: RequestHandler['listener']) {
    requestHandlers[method].push({endpoint: endpoint.split('/'), listener});
}

const handleGet = (request: IncomingMessage, response: ServerResponse) => {
    const requestUrl = new URL(request.url ?? "/", "https://" + request.headers.host);
    const visited = requestUrl.pathname.split('/');

    handlerLoop:
    for (const handler of requestHandlers.GET) {
        if (visited.length !== handler.endpoint.length) continue;
        
        const args = [] as string[];
        for (let i = 0; i < visited.length; i++) {
            if (handler.endpoint[i] === "{}") {
                args.push(visited[i]);
            }
            else if (handler.endpoint[i] !== visited[i]) {
                continue handlerLoop;
            }
        }

        handler.listener(request, response, args);
        return;
    }
    
    // I think this is technically attackable but that's fiiiinneeeeee, right?
    sendFile(request.url?.slice(1) ?? "", response);
}

function handlePost(request: IncomingMessage, response: ServerResponse) {
    const requestUrl = new URL(request.url ?? "/", "https://" + request.headers.host);
    const visited = requestUrl.pathname.split('/');

    handlerLoop:
    for (const handler of requestHandlers.POST) {
        if (visited.length !== handler.endpoint.length) continue;
        
        const args = [] as string[];
        for (let i = 0; i < visited.length; i++) {
            if (handler.endpoint[i] === "{}") {
                args.push(visited[i]);
            }
            else if (handler.endpoint[i] !== visited[i]) {
                continue handlerLoop;
            }
        }

        handler.listener(request, response, args);
        return;
    }
    
    response.writeHead(404);
    response.end();
}

export function getFormData(request: IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
        let dataString = '';

        request.on('data', data => {
            dataString += data;
        });
        
        request.on("error", err => reject(err));

        request.on('end', () => {
            resolve(dataString);
        });
    });
}

export async function getFormDataJson(request: IncomingMessage) {
    return JSON.parse(await getFormData(request));
} 

export function sendFile(relFilename: string, response: ServerResponse) {
    const isSourceMap = ['.ts', '.tsx'].includes(path.extname(relFilename));
    const type = isSourceMap ? "application/json" : mime.getType(relFilename) ?? "";
    
    const filename = path.join(isSourceMap ? BASE_PATH : PUBLIC, relFilename);

    fs.readFile(filename, (err, content) => {
        // if the error = null, then we've loaded the file successfully
        if (err === null) {
            response.writeHead(200, {
                'Content-Type': type
            });
            response.end(content);
        } else {
            // file not found, error code 404
            response.writeHead(404);
            response.end('404 Error: File Not Found');
        }
    });
}

export function fileEndpoint(relFilename: string | (() => string)) {
    return (_: IncomingMessage, response: ServerResponse) => typeof relFilename === 'function'
    ? sendFile(relFilename(), response)
    : sendFile(relFilename, response);
}

export function sendJson(obj: object, response: ServerResponse, status = 200) {
    response.writeHead(status, {
        'Content-Type': 'application/json'
    });
    response.end(JSON.stringify(obj));
}

export function jsonEndpoint(obj: object | (() => object)) {
    return (_: IncomingMessage, response: ServerResponse) => typeof obj === 'function'
    ? sendJson(obj(), response)
    : sendJson(obj, response);
}

export function readBasicAuth(req: IncomingMessage): [username: string, hash: string] | undefined {
    const header = req.headers.authorization;
    if (header === undefined) return undefined;

    // We don't support non-basic auth
    if (!header.startsWith("Basic ")) return undefined;

    const authPair = Buffer.from(header.slice(6), 'base64').toString();

    const [username, ...rest] = authPair.split(':');
    if (username === undefined || rest.length === 0) return undefined;

    const hash = unescape(rest.join(':'));
    return [username, hash];

}

server.listen(PORT);
console.log(`Connected at http://localhost:${PORT}`);