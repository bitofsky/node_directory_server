import { createHash } from 'crypto';
import AdmZip from 'adm-zip';

const debugEnabled = new Set(process.env.NODE_DEBUG.toLocaleLowerCase().split(',').map(s => s.trim()));
type debugType = 'warn' | 'error' | 'info';

const debuglog = (name: debugType) => (...args: any[]) => {
    if (!debugEnabled.has(name)) return;
    console[name](...args);
};

export const WARN = debuglog('warn');
export const INFO = debuglog('info');
export const ERROR = debuglog('error');

export const SIGTERM = (callback: () => void) => {
    sigtermCallbacks.push(callback);
}

export const compressDirectory = (directoryPath: string) => {
    const zip = new AdmZip();
    zip.addLocalFolder(directoryPath);
    const entries = zip.getEntries();
    return { buffer: zip.toBuffer(), entries };
}

export const toMD5 = (b: Buffer) => createHash('md5').update(b).digest('base64');

const sigtermCallbacks: (() => void)[] = [];

process.on('SIGTERM', () => {
    WARN('SIGTERM called');
    sigtermCallbacks.forEach(fn => fn());
});

process.on('uncaughtException', err => {
    ERROR('uncaughtException : ' + err ? err.stack : err);
    process.exit(1);
});

