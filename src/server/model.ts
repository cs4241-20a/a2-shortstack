import { isReply, Message, ReplyMessage, RootMessage } from "../common/message.js";
import { User } from "../common/user.js";

export default class Model {
    private _msgIdInc = 0;
    private _messages = {} as {[id: number]: Message};

    get messages() {
        return Object.values(this._messages);
    }

    get rootMessages() {
        return Object.values(this._messages).filter((x): x is RootMessage => !isReply(x));
    }

    getMessage(id: number): Message | undefined {
        return this._messages[id];
    }

    getPopularity(msg: RootMessage) {
        return Math.sqrt(msg.replies.length) + Math.max(0, 50 / Math.sqrt(Math.max(1, Date.now() / 1000 - msg.timestamp)));
    }

    getRepliesTo(msg: RootMessage): ReplyMessage[];
    getRepliesTo(msg: Message): ReplyMessage[] | undefined
    getRepliesTo(id: number): ReplyMessage[] | undefined
    getRepliesTo(msg: Message | number): ReplyMessage[] | undefined {
        if (typeof msg === 'number') {
            const retrievedMsg = this.getMessage(msg);
            if (retrievedMsg === undefined) {
                return undefined;
            }
            msg = retrievedMsg;
        }
        if (isReply(msg)) {
            return undefined;
        }
        return msg.replies.map(x => this._messages[x] as ReplyMessage);
    }

    addMessage(msg: Omit<RootMessage, 'id' | 'timestamp' | 'replies'>) {
        const newMsg = this._messages[this._msgIdInc] = {
            id: this._msgIdInc,
            author: msg.author,
            timestamp: Date.now() / 1000,
            content: msg.content,
            replies: []
        };
        this._msgIdInc++;
        return newMsg;
    }

    /** Returns true if successful, false otherwise */
    addReply(msg: Omit<ReplyMessage, 'id' | 'timestamp'>): Message | undefined {
        const rootMsg = this._messages[msg.replyTo];
        if (rootMsg === undefined || isReply(rootMsg)) return undefined;
        
        const newMsg = this._messages[this._msgIdInc] = {
            id: this._msgIdInc,
            author: msg.author,
            timestamp: Date.now() / 1000,
            content: msg.content,
            replyTo: msg.replyTo
        };
        rootMsg.replies.push(this._msgIdInc);
        this._msgIdInc++;
        return newMsg;
    }

    private _users = {} as {[username: string]: User};
    // Hashes instead of plain text passwords so that a compromised server
    // wouldn't reveal passwords. Basic authentication is still used.
    private _hashes = {} as {[username: string]: string};

    getUser(username: string) {
        return this._users[username];
    }

    createUser(user: User, hash: string) {
        if (user.username in this._users) return undefined;
        this._hashes[user.username] = hash;
        return this._users[user.username] = {
            username: user.username,
            displayName: user.displayName
        };
    }

    authorize(username: string, hash: string) {
        return this._hashes[username] === hash;
    }
}