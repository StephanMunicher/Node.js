type EventHandler = () => void;

class MyEventEmitter {
    private eventHandlers: { [eventName: string]: EventHandler[] } = {};

    registerHandler(eventName: string, handler: EventHandler): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(handler);
    }

    emitEvent(eventName: string): void {
        const handlers = this.eventHandlers[eventName];
        if (handlers) {
            handlers.forEach((handler) => handler());
        }
    }
}

// Приклад використання
const emitter = new MyEventEmitter();
emitter.registerHandler('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
emitter.emitEvent('userUpdated'); // Виведе: Обліковий запис користувача оновлено