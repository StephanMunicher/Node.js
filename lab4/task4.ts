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