import csv from 'csv-parser';
import fs from 'fs';

export function parseCSVFile(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const results: any[] = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) =>
                reject(`Error parsing csv in ${filePath}: ${err}`),
            );
    });
}
