import { Message, ReplyMessage, RootMessage } from "../../../common/message.js";
import { User } from "../../../common/user.js";
import { authHeaders, getDisplayName, getUser, refreshMessageCards } from "../main.js";
import { TextArea, Button, Spacer, Nothing, Glyph} from "./common.js";

const CLASS_BIGNAME = "mdc-typography--headline6";
const CLASS_SMALLNAME = "mdc-typography--subtitle2";
const CLASS_SMALLINFO = "mdc-typography--caption";
const CLASS_PARA = "mdc-typography--body1";

function getSentOnMessage(timestamp: number) {
    const sentDate = new Date(timestamp * 1000);
    return `Sent on ${sentDate.toLocaleDateString()} at ${sentDate.toLocaleTimeString(undefined, {timeStyle: 'short'} as any)}`;
}

async function MessageControls(attributes: VanillaJsxFactory.Attributes<{message: Message}>) {
    const deleteMessage = () => {
        fetch(`/messages/${attributes?.message.id}`, {
            method: "DELETE",
            headers: authHeaders()
        });
    };

    return <a class={CLASS_SMALLINFO} click={deleteMessage}>Delete</a>;
}

async function UserInfo(attributes: {user: User | undefined}) {
    return <>
        <span class={CLASS_BIGNAME}>{attributes.user?.displayName}</span>
        <span class={CLASS_SMALLNAME}>@{attributes.user?.username}</span>
    </>;
}

export async function MessageCard(attributes: {message: RootMessage & {'popularity': number}}) {
    let repliesElt = await (<Nothing/>);
    const populateReplies = async () => {
        const msgs = await (await fetch(`/messages/${attributes.message.id}/replies`)).json() as ReplyMessage[];
        if (msgs.length === 0) return;

        const newRepliesElt = await (<div class="replies">
            {msgs.length < 2 ? undefined : <span class={CLASS_SMALLINFO}><Glyph>arrow_downward</Glyph> Newer replies are lower</span>}
            {await Promise.all(msgs.map(async msg => <div class="mdc-card mdc-card--outlined reply">
                <div class="card-contents">
                    <div class="horizontal-spread">
                        <span class={CLASS_SMALLNAME}>{await getDisplayName(msg.author)}</span>
                        <span class={CLASS_SMALLINFO}>{getSentOnMessage(attributes.message.timestamp)}</span>
                    </div>
                    <span class={CLASS_PARA}>{msg.content}</span>
                </div>
                {getUser()?.username === msg.author ? <div class="card-footer">
                    <MessageControls message={msg}/>
                </div> : undefined}
            </div>))}
        </div>);
        repliesElt.replaceWith(newRepliesElt)
        repliesElt = newRepliesElt;
    }
    await populateReplies();

    const replyTextArea = await (<TextArea></TextArea>) as HTMLElement & {value: string};

    const sendReply = async () => {
        const response = await fetch("/messages", {
            method: "POST", 
            headers: authHeaders(),
            body: JSON.stringify({
                replyTo: attributes.message.id,
                content: replyTextArea.value
            } as ReplyMessage)
        });
        if (response.ok) {
            await populateReplies();
            replyTextArea.value = "";
        }
    };

    return <form class="mdc-card chat-message" onsubmit="return false" {...attributes}>
        <div class="card-contents">
            <div class="horizontal-spread">
                <div class="horizontal-spread">
                    <span class="mdc-typography--subtitle2">
                        {getSentOnMessage(attributes.message.timestamp)}
                    </span>&nbsp;|&nbsp;
                    <span class="mdc-typography--subtitle2">
                        Popularity: {Math.round(attributes.message.popularity).toString()}
                    </span>
                </div>
                {attributes.message.author === getUser()?.username ? <MessageControls message={attributes.message}/> : undefined}
            </div>
            <UserInfo user={{username: attributes.message.author, displayName: await getDisplayName(attributes.message.author)}}/>
            <p class={CLASS_PARA}>{attributes.message.content}</p>
            {repliesElt}
            {getUser() === undefined ? undefined : <>
                <Spacer/>
                {replyTextArea}
                <Spacer/>
                <Button click={() => sendReply()}>Reply</Button>
            </>}
        </div>
    </form>;
}

export async function SendMessageCard(attributes: VanillaJsxFactory.Attributes, _: VanillaJsxFactory.JSXElement[]) {
    const messageTextArea = await (<TextArea></TextArea>) as HTMLElement & {value: string};

    const sendMessage = async () => {
        fetch("/messages", {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify({
                content: messageTextArea.value
            } as RootMessage)
        })
        refreshMessageCards();
        messageTextArea.value = "";
    };

    return <form id="new-message-box" class="mdc-card" onsubmit="return false" {...attributes}>
        <div class="card-contents">
            <UserInfo user={getUser()}/>
            <Spacer/>
            {messageTextArea}
            <Spacer/>
            <Button click={() => sendMessage()}>Send Message</Button>
        </div>
    </form>;
}