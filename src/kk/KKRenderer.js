
// enums for state
import {delay} from './utils.js'

export const KK_STATE_REST = 0;
export const KK_STATE_ANIMATING = 1;
export const KK_STATE_SUSPENDED = 2;
export const KK_STATE_FINISHED = 3;

const u_animation_time = 'u_animation_time';

export class KKRenderer {


    constructor(
        canvas,
        vertex,
        frag,
        texture,
    ) {
        // eslint-disable-next-line no-undef
        this.sandbox = new GlslCanvas(canvas);
        if (texture) {
            this.sandbox.setUniform('u_tex0', texture);
        }
        this.sandbox.load(frag, vertex);
        // return [canvas, this.sandbox];
    }

    #minValue = 0;
    #maxValue = 1;
    #value = 0;
    #delta = 0.001;
    #state = KK_STATE_REST;
    #onStateChange;

    get value() {
        return this.#value;
    }

    set value(value) {
        this.#value = value;
        this.setUniform(u_animation_time, value)
    }

    get minValue() {
        return this.#minValue;
    }

    set minValue(minValue) {
        this.#minValue = minValue;
    }

    get maxValue() {
        return this.#maxValue;
    }

    set maxValue(maxValue) {
        this.#maxValue = maxValue;
    }

    get state() {
        return this.#state;
    }

    set state(state) {
        const onStateChange = this.#onStateChange;
        if (onStateChange) {
            const old = this.#state;
            onStateChange(old, state);
        }
        this.#state = state;
    }

    get delta() {
        return this.#delta;
    }

    set delta(delta) {
        this.#delta = delta;
    }

    set onStateChange(onStateChange) {
        this.#onStateChange = onStateChange;
    }

    setUniform = (name, ...value) => {
        this.sandbox.setUniform(name, ...value);
    }

    play = () => {
        if (this.state !== KK_STATE_REST) {
            // TODO
        }
        this.state = KK_STATE_ANIMATING;
        this.value = this.minValue;

        this.#play0();
    }

    pause = () => {
        if (this.state === KK_STATE_ANIMATING) {
            this.state = KK_STATE_SUSPENDED;
        } else {
            // TODO
        }
    }

    resume = () => {
        if (this.state === KK_STATE_SUSPENDED) {
            this.state = KK_STATE_ANIMATING;
            this.#play0();
        }
    }

    reset = () => {
        this.state = KK_STATE_REST;
        this.value = this.minValue;
    }

    #play0 = async () => {
        while (this.state === KK_STATE_ANIMATING) {
            this.value += this.delta;
            if (this.value > this.maxValue) {
                this.state = KK_STATE_FINISHED;
                break;
            }
            await delay(1)
        }
    }
}