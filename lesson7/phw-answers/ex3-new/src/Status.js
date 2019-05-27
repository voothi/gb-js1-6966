/** Здесь будет хранится статус игры, например играем мы, завершили или остановлено. */
class Status {
    constructor() {
        this.setPaused();
    }

    /** Это значит что мы играем. */
    setPlaying() {
        this.condition = 'playing';
    }

    /** Это значит что игра на паузе. */
    setPaused() {
        this.condition = 'paused';
    }

    /** Это значит что игра завершена. */
    setFinished() {
        this.condition = 'finished';
    }

    /**
     * @returns {Boolean} если мы сейчас играем, тогда true, иначе false.
     */
    isPlaying() {
        return this.condition === 'playing';
    }

    /**
     * @returns {Boolean} если сейчас игра на паузе, тогда true, иначе false.
     */
    isPaused() {
        return this.condition === 'paused';
    }
}