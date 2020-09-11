import type mdcType from "material-components-web";

declare global {
    declare const mdc: typeof mdcType;

    namespace JSX {
        interface IntrinsicElements {
            [tag: string]: VanillaJsxFactory.Attributes;
        }
        type Element = Promise<any>;
    }
}
