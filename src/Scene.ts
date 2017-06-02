/**
 * Created by dvol on 02.06.2017.
 */

enum SceneState {
    PLAYING,
    PAUSED,
    EMPTY
}

class SceneBackground {

    private _scene: Scene;

    public get color(): number { return this._scene.renderer.backgroundColor; }
    public set color(color: number) { this._scene.renderer.backgroundColor = color; }

    public constructor(scene: Scene) {
        this._scene = scene;
    }

}

export class Scene extends PIXI.Application {

    private _name: string;
    public get name(): string { return this._name; }

    private _state: SceneState;
    public get state(): SceneState { return this._state; }

    private _container: HTMLElement;
    public get container(): HTMLElement { return this._container; }
    public set container(container) {
        if (this.container != null)
            this.container.removeChild(this.view);
        this._container = container;
        this.container.appendChild(this.view);
        this.invalidate();
    }

    private _background: SceneBackground;
    public get background(): SceneBackground { return this._background; }

    public constructor(name: string, container: HTMLElement = null) {
        super();
        this._name = name;
        this._state = SceneState.EMPTY;
        this._background = new SceneBackground(this);
        if (container != null)
            this.container = container;
        // Theatre.use().scenes.push(this);
    }

    public play(): void {
        this._state = SceneState.PLAYING;
    }

    public pause(): void {
        this._state = SceneState.PAUSED;
    }

    private invalidate(): void {
        this.view.width = this.container.clientWidth;
        this.view.height = this.container.clientHeight;
    }

}
