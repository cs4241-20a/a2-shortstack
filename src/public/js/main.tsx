import { Message, ReplyMessage, RootMessage } from "../../common/message";
import type { User } from "../../common/user";

function TextField(attributes: VanillaJsxFactory.Attributes, children: VanillaJsxFactory.JSXElement[]) {
    const input = <input class="mdc-text-field__input" type="text" {...attributes}/> as HTMLInputElement;
    const elt = <label class="mdc-text-field mdc-text-field--filled">
        <span class="mdc-text-field__ripple"></span>
        <label>
            {input}
            <span class="mdc-floating-label">{children[0]}</span>
        </label>
        <span class="mdc-line-ripple"></span>
        {...children.slice(1)}
    </label>;
    mdc.textField.MDCTextField.attachTo(elt);
    mdc.ripple.MDCRipple.attachTo(elt);
    Object.defineProperties(elt, {
        value: {
            get: () => input.value,
            set: x => input.value = x
        }
    });
    return elt as HTMLElement & {value: any};
}

function TextArea(attributes: VanillaJsxFactory.Attributes, children: VanillaJsxFactory.JSXElement[]) {
    const input = <textarea class="mdc-text-field__input" rows="4" cols="40" aria-label={children[0]} {...attributes}></textarea> as HTMLTextAreaElement;
    const elt = <label class="mdc-text-field mdc-text-field--outlined mdc-text-field--textarea mdc-text-field--no-label">
        <span class="mdc-text-field__resizer">
            {input}
        </span>
        <span class="mdc-notched-outline">
            <span class="mdc-notched-outline__leading"></span>
            <span class="mdc-notched-outline__trailing"></span>
        </span>
        {...children.slice(1)}
    </label>
    return Object.defineProperties(elt, {
        value: {
            get: () => input.value,
            set: x => input.value = x
        }
    });
}

function Button(attributes: VanillaJsxFactory.Attributes, children: VanillaJsxFactory.JSXElement[]) {
    const elt = <button class="mdc-button mdc-button--raised" {...attributes}>
        <span class="mdc-button__ripple"></span>
        <span class="mdc-button__label">{children[0]}</span>
        {...children.slice(1)}
    </button>;
    mdc.ripple.MDCRipple.attachTo(elt);
    return elt;
}

function LoginOverlay() {
    let mode = 'login' as 'login' | 'register';

    const usernameField = <TextField pattern="[a-z_][a-z0-9_]*" required>Username</TextField>;
    const passwordField = <TextField type="password" minlength="8" required>Password</TextField>;

    const renderElt = () => {
        return <div id="login-overlay">
            <div id="content-cover"/>
            <div class="vertical-center">
                <div id="login-overlay-controls" class="mdc-card">
                    <form class="card-contents" onsubmit="return false">
                        <h1 class="header-font mdc-typography--headline4">RAMChat</h1>
                        {usernameField}

                        {passwordField}
                        {mode === 'register' ? <div class="mdc-text-field-helper-line">
                            <div class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent" aria-hidden="true">
                                Do not reuse sensitive passwords on this site
                            </div>
                        </div> : undefined}
                        
                        {mode === 'login' ? loginControls : registerControls}
                        <a click={() => clearLogin()}>Browse as Guest</a>
                        <span class="error-notice" hidden />
                    </form>
                </div>
            </div>
        </div> as HTMLElement;
    };

    const setMode = (newMode: typeof mode) => {
        mode = newMode;
        elt.replaceWith(elt = renderElt());
    };

    const loginControls = <>
        <a click={() => setMode('register')}>Not registered?</a>
        <Button click={() => tryLogin(usernameField.value, passwordField.value)}>Login</Button>
    </>;

    const displayNameField = <TextField pattern=".+" required>Display Name</TextField>;
    const registerControls = <>
        {displayNameField}
        <a click={() => setMode('login')}>Already registered?</a>
        <Button click={() => tryRegister(usernameField.value, passwordField.value, displayNameField.value)}>Register</Button>
    </>;

    let elt = renderElt();
    return elt;
}

let user = undefined as User | undefined;
let hash = undefined as string | undefined;

function error(msg: string | undefined) {
    document.querySelectorAll<HTMLElement>('.error-notice').forEach(x => {
        x.hidden = msg === undefined;
        x.innerText = `ERROR: ${msg}`
    });
}

function authHeaders() {
    return {
        Authorization: `Basic ${btoa(user?.username + ":" + escape(hash!))}`
    };
}

function clearLogin() {
    document.getElementById('login-overlay')?.remove();
    refreshMessageCards();
    if (user !== undefined) {
        document.getElementById('new-message-box')?.replaceWith(<SendMessageCard/>);
    }
}

async function tryLogin(username: string, password: string) {
    const hashedPassword = new TextDecoder().decode(await crypto.subtle.digest("SHA-512", new TextEncoder().encode(password)));
    try {
        const result = await fetch("/login", {
            headers: {
                Authorization: `Basic ${btoa(username + ":" + escape(hashedPassword))}`
            }
        });
        if (!result.ok) throw result;

        hash = hashedPassword;
        user = await result.json();
        clearLogin();
    }
    catch (e) {
        console.error(e);
        error("Either that user does not exist or you did not provide the correct password.");
    }
}

async function tryRegister(username: string, password: string, displayName: string) {
    const hashedPassword = new TextDecoder().decode(await crypto.subtle.digest("SHA-512", new TextEncoder().encode(password)));
    try {
        const result = await fetch("/users", {
            method: "POST",
            body: JSON.stringify({
                username,
                displayName,
                hash: hashedPassword
            })
        });
        if (!result.ok) throw result;

        hash = hashedPassword;
        user = {
            username,
            displayName
        };
        clearLogin();
    }
    catch (e) {
        console.error(e);
        error("That user could not be created. Someone else may already have that username.");
    }
}

const _displayNameCache = {} as {[username: string]: string}
async function getDisplayName(username: string) {
    if (username in _displayNameCache) return _displayNameCache[username];
    const result = await fetch(`/users/${username}`);
    if (!result.ok) return "UNKNOWN";
    return _displayNameCache[username] = (await result.json())['displayName'];
}

function MessageCard(attributes: {message: RootMessage & {'popularity': number}}, _: VanillaJsxFactory.JSXElement[]) {
    const displayNameElt = <span class="mdc-typography--headline6"></span> as HTMLSpanElement;
    getDisplayName(attributes.message.author).then(x => displayNameElt.replaceWith(<span class="mdc-typography--headline6">{x}</span>));

    let repliesElt = <ul class="mdc-list mdc-list--two-line"></ul> as HTMLUListElement;
    const populateReplies = () => {
        fetch(`/messages/${attributes.message.id}/replies`)
        .then(res => res.json())
        .then(async (msgs: ReplyMessage[]) => {
            const newRepliesElt = <ul class="mdc-list mdc-list--two-line">
                {await Promise.all(msgs.map(async msg => <li class="mdc-list-item reply">
                    <span>{await getDisplayName(msg.author)}</span>
                    <span class="mdc-list-item__text">{msg.content}</span>
                </li>))}
            </ul>;
            repliesElt.replaceWith(newRepliesElt)
            repliesElt = newRepliesElt;
        });
    }
    populateReplies();

    const replyTextArea = <TextArea></TextArea> as HTMLElement & {value: string};

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
            populateReplies();
            replyTextArea.value = "";
        }
    };

    const sentDate = new Date(attributes.message.timestamp * 1000);
    return <div class="mdc-card chat-message" {...attributes}>
        <div class="card-contents">
            <span class="mdc-typography--subtitle2">
                Sent on {sentDate.toLocaleDateString()} at {sentDate.toLocaleTimeString(undefined, {timeStyle: 'short'} as any)} |
                Popularity: {Math.round(attributes.message.popularity)}
            </span>
            {displayNameElt}
            <span class="mdc-typography--subtitle2">@{attributes.message.author}</span>
            <p class="mdc-typography--body1">{attributes.message.content}</p>
            {repliesElt}
            {user === undefined ? undefined : <form class="reply-box" onsubmit="return false">
                {replyTextArea}
                <Button click={() => sendReply()}>Reply</Button>
            </form>}
        </div>
    </div>;
}

function SendMessageCard(attributes: VanillaJsxFactory.Attributes, _: VanillaJsxFactory.JSXElement[]) {
    const replyTextArea = <TextArea></TextArea> as HTMLElement & {value: string};

    const sendMessage = async () => {
        fetch("/messages", {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify({
                content: replyTextArea.value
            } as RootMessage)
        })
        refreshMessageCards();
        replyTextArea.value = "";
    };

    return <div id="new-message-box" class="mdc-card" {...attributes}>
        <div class="card-contents">
            <span class="mdc-typography--headline6">{user?.displayName}</span>
            <span class="mdc-typography--subtitle2">@{user?.username}</span>
            {replyTextArea}
            <Button click={() => sendMessage()}>Send Message</Button>
        </div>
    </div>;
}

async function getRootMessages() {
    return await (await fetch("/messages/root")).json() as (RootMessage & {popularity: number})[];
}

async function refreshMessageCards() {
    document.getElementById('messages')?.replaceWith(
        <div id="messages">
            {(await getRootMessages()).sort((a, b) => b.popularity - a.popularity).map(x => <MessageCard message={x}/>)}
        </div>
    );
}

window.addEventListener('DOMContentLoaded', async () => {
    document.body.append(...(<>
        <LoginOverlay />
        <div id="message-root">
            <SendMessageCard hidden />
            <div id="messages"/>
        </div>
    </>));
    refreshMessageCards();
});