import dotenv from 'dotenv';
const __dirname = new URL('.', import.meta.url).pathname;

dotenv.config({ path: __dirname + '/../.env' });

export const SERV_DIR = process.env.SERV_DIR;
export const SERV_ADDR = process.env.SERV_ADDR;
export const SERV_PORT = process.env.SERV_PORT;
export const SERV_PATH = process.env.SERV_PATH;
export const SERV_MD5_PATH = process.env.SERV_MD5_PATH;
export const SERV_INFO_PATH = process.env.SERV_INFO_PATH;
export const SERV_INFO_VALUE = process.env.SERV_INFO_VALUE;

export const METRICS_PATH = process.env.METRICS_PATH;
export const METRICS_PORT = process.env.METRICS_PORT;

export const ALL_PATHS = [SERV_PATH, SERV_MD5_PATH, SERV_INFO_PATH, METRICS_PATH].filter(f => String(f || '').trim());

console.log('config : ', {
    SERV_DIR,
    SERV_ADDR,
    SERV_PORT,
    SERV_PATH,
    SERV_MD5_PATH,
    SERV_INFO_PATH,
    SERV_INFO_VALUE,
    METRICS_PATH,
    METRICS_PORT,
    ALL_PATHS,
});
console.log('env : ', { ...process.env });
