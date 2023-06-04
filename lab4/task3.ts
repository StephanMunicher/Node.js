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