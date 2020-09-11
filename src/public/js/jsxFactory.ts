namespace VanillaJsxFactory {
    type JSXElementWithoutPromise = JSXFragment | Element | string | undefined;
    type JSXElementWithoutFragmentOrPromise = Element | string | undefined;
    export type JSXElement = Promise<JSXElementWithoutPromise> | JSXFragment | Element | string | undefined;
    export type JSXFragment = JSXElement[];
    export type Attributes<T = {}> = ({[attr: string]: string | Function | boolean | object | undefined} & T) | undefined;
    export type CustomElement = (attrs: Attributes, children: JSXElement[]) => Element | JSXFragment | Promise<Element | JSXFragment>;

    export const Fragment = null;

    export async function createElement(tag: string | CustomElement, attrs: Attributes, ...children: JSXElement[]): Promise<Element>;
    export async function createElement(tag: null, attrs: {} | undefined, ...children: JSXElement[]): Promise<JSXFragment>;
    export async function createElement(tag: string | CustomElement | null, attrs: Attributes, ...children: JSXElement[]): Promise<Element | JSXFragment> {
        if (tag === null) {
            return Promise.all(children);
        }
        if (typeof tag === 'function') {
            return tag(attrs, children.filter(x => x !== undefined));
        }

        const elt = document.createElement(tag);
        for (const attr in attrs) {
            const attributeValue = attrs[attr];
            if (attributeValue === undefined) {
                // Do nothing
            }
            else if (typeof attributeValue === 'function') {
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
        for (const childPromise of children.filter(x => x !== undefined)) {
            const child = await childPromise;
            if (child !== undefined) {
                if (child instanceof Array) {
                    const flatten = async (frag: JSXElement): Promise<any[]> => {
                        if (frag instanceof Array) {
                            return await frag.reduce(
                                async (result: Promise<JSXElementWithoutFragmentOrPromise[]>, current) =>
                                    (await result).concat(await flatten(current)),
                                Promise.resolve([]));
                        }
                        else if (frag instanceof Promise) {
                            return await flatten(await frag);
                        }
                        return [frag];
                    };
                    elt.append(...await flatten(child));
                }
                else {
                    elt.append(child);
                }
            }
        }
        return elt;
    }
}