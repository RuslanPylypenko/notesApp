export default class EventManager {
    constructor() {
        this.listeners = {}
    }


    subscribe(eventType, listener) {
        if (!this.listeners[eventType]) this.listeners[eventType] = []

        this.listeners[eventType].push(listener)
    }

    unsubscribe(eventType, listener) {
        const idx = this.listeners[eventType].indexOf(listener)
        if (idx !== -1) {
            this.listeners[eventType].splice(idx, 1)
        }
    }

    notify(eventType, data) {
        this.listeners[eventType].forEach(listener => {
            if(typeof listener['update'] === 'function'){
                listener.update(data)
            }
        })
    }
}