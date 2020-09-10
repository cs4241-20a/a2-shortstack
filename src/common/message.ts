import { User } from "./user.js";

interface MessageBase {
    /** The ID of the message */
    id: number;
    /** The username of the message author */
    author: User['username'];
    /** Unix timestamp of when the message was sent */
    timestamp: number;
    /** The text content of the message */
    content: string;
}

export interface RootMessage extends MessageBase {
    /** The IDs of the messages which are replies to this one */
    replies: number[];
}

export interface ReplyMessage extends MessageBase {
    /** The ID of the message that this message is a reply to */
    replyTo: number;
}

export function isReply(msg: Message): msg is ReplyMessage {
    return 'replyTo' in msg;
}

export type Message = RootMessage | ReplyMessage;