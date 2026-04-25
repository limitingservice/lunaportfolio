/**
 * smoothing.js — Signal smoothing utilities for AR tracking
 *
 * One Euro Filter: Jitter reduction while maintaining responsiveness.
 * Used by Snapchat, Instagram, and most production AR apps.
 *
 * Reference: "1€ Filter: A Simple Speed-based Low-pass Filter for Noisy Input"
 * Géry Casiez, Nicolas Roussel, Daniel Vogel (CHI 2012)
 *
 * Parameters:
 *   minCutoff — Lower = more smoothing at rest (default 1.0)
 *   beta      — Higher = more responsiveness to fast movement (default 0.007)
 *   dCutoff   — Derivative cutoff frequency (default 1.0)
 */

class LowPassFilter {
    constructor(alpha, initval = 0) {
        this.y = initval;
        this.s = initval;
        this.a = alpha;
        this.initialized = false;
    }

    filter(value, alpha) {
        if (!this.initialized) {
            this.s = value;
            this.initialized = true;
            return value;
        }
        const a = alpha !== undefined ? alpha : this.a;
        this.s = a * value + (1 - a) * this.s;
        return this.s;
    }

    lastValue() {
        return this.s;
    }

    reset() {
        this.initialized = false;
    }
}

export class OneEuroFilter {
    constructor(freq, minCutoff = 1.0, beta = 0.007, dCutoff = 1.0) {
        this.freq = freq;
        this.minCutoff = minCutoff;
        this.beta = beta;
        this.dCutoff = dCutoff;
        this.x = new LowPassFilter(this._alpha(minCutoff));
        this.dx = new LowPassFilter(this._alpha(dCutoff), 0);
        this.lastTime = null;
    }

    _alpha(cutoff) {
        const te = 1.0 / this.freq;
        const tau = 1.0 / (2 * Math.PI * cutoff);
        return 1.0 / (1.0 + tau / te);
    }

    filter(value, timestamp) {
        // Update frequency if timestamp is provided
        if (this.lastTime !== null && timestamp !== undefined) {
            const dt = timestamp - this.lastTime;
            if (dt > 0) {
                this.freq = 1.0 / dt;
            }
        }
        this.lastTime = timestamp;

        // Derivative
        const dval = this.x.initialized
            ? (value - this.x.lastValue()) * this.freq
            : 0;
        const edval = this.dx.filter(dval, this._alpha(this.dCutoff));

        // Adaptive cutoff
        const cutoff = this.minCutoff + this.beta * Math.abs(edval);

        return this.x.filter(value, this._alpha(cutoff));
    }

    reset() {
        this.x.reset();
        this.dx.reset();
        this.lastTime = null;
    }
}

/**
 * Group of One Euro Filters for multi-dimensional values (x, y, z, etc.)
 */
export class OneEuroFilterGroup {
    constructor(dimensions, freq = 30, minCutoff = 1.0, beta = 0.007, dCutoff = 1.0) {
        this.filters = [];
        for (let i = 0; i < dimensions; i++) {
            this.filters.push(new OneEuroFilter(freq, minCutoff, beta, dCutoff));
        }
    }

    filter(values, timestamp) {
        return values.map((v, i) => this.filters[i].filter(v, timestamp));
    }

    reset() {
        this.filters.forEach((f) => f.reset());
    }
}

/**
 * Exponential Moving Average — simpler alternative for less-critical values
 */
export class EMA {
    constructor(alpha = 0.3) {
        this.alpha = alpha;
        this.value = null;
    }

    filter(newValue) {
        if (this.value === null) {
            this.value = newValue;
            return newValue;
        }
        this.value = this.alpha * newValue + (1 - this.alpha) * this.value;
        return this.value;
    }

    reset() {
        this.value = null;
    }
}

export default { OneEuroFilter, OneEuroFilterGroup, EMA };
