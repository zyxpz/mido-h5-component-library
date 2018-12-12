export default class PullDown {
    wrap: HTMLElement;
    pullDom: any;
    pullMoveEvent: any;
    pullEndEvent: any;
    down: boolean;
    downDom: HTMLElement;
    private startPos;
    private endPos;
    private pullDomHei;
    constructor(opts: any);
    init(): void;
    private handleFindEl;
    private handlePullEl;
    private handleCreatDownEl;
    private handleMoveEventListener;
    private handleTouchStart;
    private handleTouchMove;
    private handleTouchEnd;
}
