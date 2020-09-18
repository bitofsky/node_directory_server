import { start } from './express';
import { compressDirectory, toMD5, ERROR, WARN } from './util';
import { SERV_DIR, SERV_PATH, SERV_ADDR, SERV_PORT, SERV_MD5_PATH, SERV_INFO_PATH, SERV_INFO_VALUE } from './config';

if (!SERV_DIR) throw new Error('env.SERV_DIR undefined');

const { buffer, entries } = compressDirectory(SERV_DIR);
const md5 = toMD5(buffer);

(async () => {

    const app = await start();

    // Serving compressed buffer
    app.get(SERV_PATH, (_, res) => res.send(buffer).end()) &&
        WARN(`SERV_PATH = http://${SERV_ADDR}:${SERV_PORT}${SERV_PATH}\nSERV_DIR = ${SERV_DIR} (${buffer.byteLength}bytes)\nENTRIES = ${entries.map(o => SERV_DIR + '/' + o.name).join(', ')}`);

    // Serving md5
    SERV_MD5_PATH && app.get(SERV_MD5_PATH, (_, res) => res.send(md5).end()) && WARN(`SERV_MD5_PATH = ${SERV_MD5_PATH} (${md5})`);

    // serving info
    SERV_INFO_PATH && app.get(SERV_INFO_PATH, (_, res) => res.send(SERV_INFO_VALUE).end()) && WARN(`SERV_INFO_PATH = ${SERV_INFO_PATH} (${SERV_INFO_VALUE})`);

})().catch(e => {
    ERROR(e.stack || e.toString());
    process.exit(1);
})
