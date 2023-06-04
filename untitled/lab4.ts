///Task1

async function runSequent<T, R>(
    array: T[],
    callback: (item: T, index: number) => Promise<R>): Promise<R[]> {
    const results: R[] = [];
    for (let i = 0; i < array.length; i++) {
        const result = await callback(array[i], i);
        results.push(result);
    }
    return results;
}

// Приклад виклику
const array: string[] = ["one", "two", "three"];
const results = await runSequent(array, (item, index) =>
    Promise.resolve({
        item,
        index,
    })
);


console.log(results);





///Task2

function arrayChangeDelete<T>(
    array: T[],
    rule: (item: T) => boolean
): T[] {
    const deletedElements: T[] = [];
    let i = 0;
    while (i < array.length) {
        const item = array[i];
        if (rule(item)) {
            deletedElements.push(...array.splice(i, 1));
        } else {
            i++;
        }
    }
    return deletedElements;
}

// Приклад виклику
const array = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);


console.log(array);
console.log(deletedElements);




///Task3

import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

async function saveHtmlContent(link: string, filePath: string): Promise<void> {
    try {
        const response = await axios.get(link);
        const htmlContent = response.data;
        fs.writeFileSync(filePath, htmlContent);
        console.log(`Збережено HTML для посилання: ${link}`);
    } catch (error) {
        console.log(`Помилка при завантаженні посилання ${link}: ${error.message}`);
    }
}

function createPagesFolder(jsonFilePath: string): string {
    const jsonFileName = path.basename(jsonFilePath, path.extname(jsonFilePath));
    const pagesFolder = `${jsonFileName}_pages`;
    fs.mkdirSync(pagesFolder);
    return pagesFolder;
}

function processJsonFile(jsonFilePath: string): void {
    try {
        const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
        const pagesFolder = createPagesFolder(jsonFilePath);
        jsonData.forEach(async (link: string, index: number) => {
            const fileName = `page_${index + 1}.html`;
            const filePath = path.join(pagesFolder, fileName);
            await saveHtmlContent(link, filePath);
        });
    } catch (error) {
        console.log('Помилка при читанні або аналізі JSON-файлу:', error.message);
    }
}

// Отримання аргументів командного рядка
const jsonFilePath = process.argv[2];

// Перевірка наявності шляху до JSON-файлу
if (!jsonFilePath) {
    console.log('Шлях до JSON-файлу не вказано');
    process.exit(1);
}

// Обробка JSON-файлу
processJsonFile(jsonFilePath);





///Task4

import * as si from 'systeminformation';
import * as batteryLevel from 'battery-level';
import * as batteryTime from 'battery-time';

// Отримання аргументів командного рядка
const frequencyInSeconds: number = parseInt(process.argv[2]);

// Функція для виведення системної інформації
async function printSystemInfo(): Promise<void> {
    try {
        const operatingSystem = await si.osInfo();
        const architecture = await si.system();
        const currentUser = await si.currentUser();
        const cpuCores = await si.cpu();
        const cpuTemperature = await si.cpuTemperature();
        const graphicsControllers = await si.graphics();
        const memory = await si.mem();
        const battery = await si.battery();

        console.log('Operating System:', operatingSystem.platform);
        console.log('Architecture:', architecture.arch);
        console.log('Current User:', currentUser.user);
        console.log('CPU Cores Models:', cpuCores.cores.map((core) => core.model));
        console.log('CPU Temperature:', cpuTemperature.main);
        console.log('Graphics Controllers:', graphicsControllers.controllers.map((controller) => `${controller.vendor} ${controller.model}`));
        console.log('Total Memory:', (memory.total / 1024 / 1024 / 1024).toFixed(2), 'GB');
        console.log('Used Memory:', (memory.used / 1024 / 1024 / 1024).toFixed(2), 'GB');
        console.log('Free Memory:', (memory.free / 1024 / 1024 / 1024).toFixed(2), 'GB');
        console.log('Battery Charging:', battery.ischarging);
        console.log('Battery Percentage:', battery.percent);
        console.log('Battery Remaining Time:', await batteryTime());

    } catch (error) {
        console.log('Помилка при отриманні системної інформації:', error.message);
    }
}

// Функція для встановлення інтервалу виклику
function setTimeInterval(): void {
    setInterval(async () => {
        await printSystemInfo();
    }, frequencyInSeconds * 1000);
}

// Перевірка наявності частоти виклику
if (!frequencyInSeconds) {
    console.log('Частоту виклику не вказано');
    process.exit(1);
}

// Запуск виведення системної інформації з заданою частотою
setTimeInterval();




///Task5

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
emitter.emitEvent('userUpdated');