export const CLASS_BIGNAME = "mdc-typography--headline6";
export const CLASS_SMALLNAME = "mdc-typography--subtitle2";
export const CLASS_SMALLINFO = "mdc-typography--caption";
export const CLASS_PARA = "mdc-typography--body1";

export async function TextField(attributes: VanillaJsxFactory.Attributes, children: VanillaJsxFactory.JSXElement[]) {
    const input = await (<input class="mdc-text-field__input" type="text" {...attributes}/>) as HTMLInputElement;
    const elt = await (<label class="mdc-text-field mdc-text-field--filled">
        <span class="mdc-text-field__ripple"></span>
        <label>
            {input}
            <span class="mdc-floating-label">{children[0]}</span>
        </label>
        <span class="mdc-line-ripple"></span>
        {...children.slice(1)}
    </label>);
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

export async function TextArea(attributes: VanillaJsxFactory.Attributes, children: VanillaJsxFactory.JSXElement[]) {
    const input = await (<textarea class="mdc-text-field__input" rows="4" cols="40" aria-label={children[0]} {...attributes}></textarea>) as HTMLTextAreaElement;
    const elt = await (<label class="mdc-text-field mdc-text-field--outlined mdc-text-field--textarea mdc-text-field--no-label">
        <span class="mdc-text-field__resizer">
            {input}
        </span>
        <span class="mdc-notched-outline">
            <span class="mdc-notched-outline__leading"></span>
            <span class="mdc-notched-outline__trailing"></span>
        </span>
        {...children.slice(1)}
    </label>) as HTMLLabelElement;
    return Object.defineProperties(elt, {
        value: {
            get: () => input.value,
            set: x => input.value = x
        }
    });
}

export async function Button(attributes: VanillaJsxFactory.Attributes<{btnStyle?: 'raised' | 'outline' | 'none'}>, children: VanillaJsxFactory.JSXElement[]) {
    const btnStyle = {
        raised: 'mdc-button--raised',
        outline: 'mdc-button--outlined',
        none: ''
    }[attributes?.btnStyle ?? 'raised'];
    const elt = await (<button class={`mdc-button ${btnStyle}`} {...attributes as any}>
        <span class="mdc-button__ripple"></span>
        <span class="mdc-button__label">{children[0]}</span>
        {...children.slice(1)}
    </button>);
    mdc.ripple.MDCRipple.attachTo(elt);
    return elt;
}

export async function Spacer(attributes?: VanillaJsxFactory.Attributes<{height?: string}>) {
    return <div class="spacer" style={attributes?.height === undefined ? undefined : `height: ${attributes.height}`}/>;
}

export async function Glyph(attributes: VanillaJsxFactory.Attributes, children: VanillaJsxFactory.JSXElement[]) {
    return <span class="material-icons" {...attributes}>{children[0]}</span>;
}

export async function Nothing() {
    return <span style="display: none"/>;
}