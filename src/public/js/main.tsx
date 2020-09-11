import { RootMessage } from "../../common/message.js";
import type { User } from "../../common/user.js";
import { Button, Spacer } from "./components/common.js";
import { LoginOverlay } from "./components/login.js";
import { MessageCard, SendMessageCard } from "./components/messages.js";

let user = undefined as User | undefined;
let hash = undefined as string | undefined;

export function setUserAndHash(_user: User, _hash: string) {
    user = _user;
    hash = _hash;
}
export function getUser() { return user; }

export function authHeaders() {
    return {
        Authorization: `Basic ${btoa(user?.username + ":" + escape(hash!))}`
    };
}

export async function clearLogin() {
    document.getElementById('login-overlay')?.remove();
    refreshMessageCards();
    if (user !== undefined) {
        document.body.classList.add('logged-in');
        document.getElementById('new-message-box')?.replaceWith(await (<SendMessageCard/>));
    }
}

const _displayNameCache = {} as {[username: string]: string}
export async function getDisplayName(username: string): Promise<string> {
    if (username in _displayNameCache) return _displayNameCache[username];
    const result = await fetch(`/users/${username}`);
    if (!result.ok) return "UNKNOWN";
    return _displayNameCache[username] = (await result.json())['displayName'];
}

async function getRootMessages() {
    return await (await fetch("/messages/root")).json() as (RootMessage & {popularity: number})[];
}

export async function refreshMessageCards() {
    document.getElementById('messages')?.replaceWith(
        await (<div id="messages">
            {(await getRootMessages()).sort((a, b) => b.popularity - a.popularity).map(x => <MessageCard message={x}/>)}
        </div>)
    );
}

window.addEventListener('DOMContentLoaded', async () => {
    document.body.append(...await (<>
        <LoginOverlay />
        <div id="message-root">
            <Button btnStyle="none" click={() => refreshMessageCards()}>Refresh Messages</Button>
            <Spacer height="16px"/>
            <SendMessageCard hidden />
            <div id="messages"/>
        </div>
    </>));
    refreshMessageCards();
});