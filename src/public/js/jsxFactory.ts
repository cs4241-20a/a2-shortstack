namespace VanillaJsxFactory {
    export type JSXElement = Element | string | JSXFragment;
    export type JSXFragment = JSXElement[];
    export type Attributes = {[attr: string]: string | Function | boolean | object} | undefined;
    export type CustomElement = (attrs: Attributes, children: JSXElement[]) => Element | JSXFragment;

    export const Fragment = null;

    export function createElement(tag: string | CustomElement, attrs: Attributes, ...children: JSXElement[]): Element;
    export function createElement(tag: null, attrs: {} | undefined, ...children: JSXElement[]): JSXFragment;
    export function createElement(tag: string | CustomElement | null, attrs: Attributes, ...children: JSXElement[]): Element | JSXFragment {
        if (tag === null) {
            return [...children];
        }
        if (typeof tag === 'function') {
            return tag(attrs, children.filter(x => x !== undefined));
        }

        const elt = document.createElement(tag);
        for (const attr in attrs) {
            const attributeValue = attrs[attr];
            if (typeof attributeValue === 'function') {
                elt.addEventListener(attr, attributeValue as EventListener);
            }
            else if (typeof attributeValue === 'boolean') {
                elt.setAttribute(attr, attributeValue ? "true" : "false");
            }
            else if (typeof attributeValue === 'object') {
                // Do nothing
            }
            else {
                elt.setAttribute(attr, attributeValue);
            }
        }
        for (const child of children.filter(x => x !== undefined)) {
            if (child) {
                if (child instanceof Array) {
                    elt.append(...child.flat(Infinity) as (Element | string)[]);
                }
                else {
                    elt.append(child);
                }
            }
        }
        return elt;
    }
}