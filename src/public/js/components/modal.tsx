export async function Modal(attributes: VanillaJsxFactory.Attributes<{unwrapped?: boolean}>, children: VanillaJsxFactory.JSXElement[]) {
    const unwrapped = attributes?.unwrapped ?? false;
    
    const wrapper = (children: VanillaJsxFactory.JSXElement[]) => <div class="modal-container" {...attributes}>
        <div class="content-cover"/>
        <div class="center">
            <form class="modal-controls mdc-card" onsubmit="return false">
                {...children}
            </form>
        </div>
    </div>;

    const modal = await (unwrapped
        ? wrapper(children)
        : wrapper(await (<div class="card-contents"> {...children}</div>))) as HTMLElement & {clear(): void};

    modal.clear = () => modal.remove();

    return modal;
}