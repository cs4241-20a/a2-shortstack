import { Message, ReplyMessage, RootMessage } from "../../common/message.js";
import type { User } from "../../common/user.js";
import { Button, CLASS_BIGNAME, CLASS_SMALLNAME, Spacer, Table } from "./components/common.js";
import { LoginModal } from "./components/loginModal.js";
import { MessageCard, SendMessageCard } from "./components/messages.js";
import { Modal } from "./components/modal.js";

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
    (document.getElementById("login-modal") as any as {clear(): void}).clear();
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

async function viewRawDataModal() {
    const data = await (await fetch("/all", {
        headers: authHeaders()
    })).json() as {
        messages: Message[],
        users: (User & {hash: string})[]
    };

    const modal = await (<Modal>
        <h1 class={CLASS_BIGNAME}>Messages</h1>
        <Table>
            <thead>
                <tr>
                    <th class="mdc-data-table__header-cell--numeric">ID</th>
                    <th>Author</th>
                    <th class="mdc-data-table__header-cell--numeric">Timestamp</th>
                    <th>Content</th>
                    <th>Replies</th>
                    <th class="mdc-data-table__header-cell--numeric">Reply To</th>
                </tr>
            </thead>
            <tbody>
                {Promise.all(data.messages.map(x => <tr>
                    <td class="mdc-data-table__cell--numeric">{x.id}</td>
                    <td>{x.author}</td>
                    <td class="mdc-data-table__cell--numeric">{x.timestamp}</td>
                    <td>{x.content}</td>
                    <td>{(x as RootMessage).replies?.join(", ")}</td>
                    <td class="mdc-data-table__cell--numeric">{(x as ReplyMessage).replyTo}</td>
                </tr>))}
            </tbody>
        </Table>
        <h1 class={CLASS_BIGNAME}>Users</h1>
        <span class={CLASS_SMALLNAME}>Hashes are omitted for other users for security reasons</span>
        <Table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Display Name</th>
                    <th>Password Hash</th>
                </tr>
            </thead>
            <tbody>
                {Promise.all(data.users.map(x => <tr>
                    <td>{x.username}</td>
                    <td>{x.displayName}</td>
                    <td>{x.hash}</td>
                </tr>))}
            </tbody>
        </Table>
        <Button click={() => modal.remove()}>Close</Button>
    </Modal>) as HTMLElement;

    document.body.append(modal);
}

window.addEventListener('DOMContentLoaded', async () => {
    // Let's load this first
    document.body.append(await (<LoginModal/>));
    document.body.append(await (<div id="message-root">
        <Button btnStyle="none" click={() => refreshMessageCards()}>Refresh Messages</Button>
        <Spacer height="16px"/>
        <SendMessageCard hidden />
        <div id="messages"/>
        <Button btnStyle="none" click={() => viewRawDataModal()}>View Raw Data</Button>
    </div>));
    refreshMessageCards();
});