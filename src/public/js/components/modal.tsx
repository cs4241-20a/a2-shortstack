export async function Modal(attributes: VanillaJsxFactory.Attributes<{unwrapped?: boolean}>, children: VanillaJsxFactory.JSXElement[]) {
    const unwrapped = attributes?.unwrapped ?? false;
    
    const wrapper = (children: VanillaJsxFactory.JSXElement[]) => <div class="modal-container">
        <div class="content-cover"/>
        <div class="vertical-center">
            <div class="modal-controls mdc-card">
                {...children}
            </div>
        </div>
    </div>;

    const modal = await (unwrapped
        ? wrapper(children)
        : wrapper(await (<form class="card-contents" onsubmit="return false"> {...children}</form>))) as HTMLElement & {clear(): void};

    modal.clear = () => modal.remove();

    return modal;
}