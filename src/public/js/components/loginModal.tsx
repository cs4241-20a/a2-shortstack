import { clearLogin, setUserAndHash } from "../main.js";
import { TextField, Button} from "./common.js";
import { Modal } from "./modal.js";

export async function LoginModal() {
    let mode = 'login' as 'login' | 'register';

    const usernameField = await (<TextField pattern="[a-z_][a-z0-9_]*" required>Username</TextField>);
    const passwordField = await (<TextField type="password" minlength="8" required>Password</TextField>);

    const renderElt = async () => {
        return <Modal id="login-modal">
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
        </Modal>;
    };

    const setMode = async (newMode: typeof mode) => {
        mode = newMode;
        elt.replaceWith(elt = await renderElt());
    };

    const loginControls = await (<>
        <a click={() => setMode('register')}>Not registered?</a>
        <Button click={() => tryLogin(usernameField.value, passwordField.value)}>Login</Button>
    </>);

    const displayNameField = await (<TextField pattern=".+" required>Display Name</TextField>);
    const registerControls = await (<>
        {displayNameField}
        <a click={() => setMode('login')}>Already registered?</a>
        <Button click={() => tryRegister(usernameField.value, passwordField.value, displayNameField.value)}>Register</Button>
    </>);

    let elt = await renderElt();
    return elt;
}

function error(msg: string | undefined) {
    document.querySelectorAll<HTMLElement>('.error-notice').forEach(x => {
        x.hidden = msg === undefined;
        x.innerText = `ERROR: ${msg}`
    });
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

        setUserAndHash(await result.json(), hashedPassword);
        clearLogin();
    }
    catch (e) {
        console.error(e);
        error("Either that user does not exist or you did not provide the correct password.");
    }
}

async function tryRegister(username: string, password: string, displayName: string) {
    if (password.length < 8 || !username.match(/^[a-z_][a-z0-9_]*$/) || displayName.length < 1) {
        // Backend verification is a pain. Let's not bother and just let the user screw themselves over if they want to.
        error("Either your username, password, or display name is invalid");
        return;
    }

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

        setUserAndHash({username, displayName}, hashedPassword);
        clearLogin();
    }
    catch (e) {
        console.error(e);
        error("That user could not be created. Someone else may already have that username.");
    }
}