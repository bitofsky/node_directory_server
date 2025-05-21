import { createHash } from 'crypto';
import AdmZip from 'adm-zip';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const debugEnabled = new Set((process.env.NODE_DEBUG || '').toLocaleLowerCase().split(',').map(s => s.trim()));
type debugType = 'warn' | 'error' | 'info';

console.log(debugEnabled);

const debuglog = (name: debugType) => (...args: any[]) => {
    if (!debugEnabled.has(name)) return;
    console[name](...args);
};

export const WARN = debuglog('warn');
export const INFO = debuglog('info');
export const ERROR = console.error.bind(console);

export function SIGTERM(callback: () => void) {
    sigtermCallbacks.push(callback);
}

export function compressDirectory(directoryPath: string) {
    const zip = new AdmZip();
    zip.addLocalFolder(directoryPath);
    const entries = zip.getEntries();
    return { buffer: zip.toBuffer(), entries };
}

export function toMD5(b: Buffer) {
    return createHash('md5').update(b).digest('base64');
}

export function getFilename(url: string) {
    __filename = fileURLToPath(url);
    return __filename;
}

export function getDirname(url: string) {
    __dirname = dirname(getFilename(url));
    return __dirname;
}

const sigtermCallbacks: (() => void)[] = [];

process.on('SIGTERM', () => {
    WARN('SIGTERM called');
    sigtermCallbacks.forEach(fn => fn());
});

process.on('uncaughtException', err => {
    ERROR('uncaughtException : ' + err ? err.stack : err);
    process.exit(1);
});

