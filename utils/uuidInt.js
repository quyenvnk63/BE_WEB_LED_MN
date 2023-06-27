const { v4: uuidv4, parse: parseUUID } = require('uuid');

async function uuidToInt() {
    const uuid = uuidv4();
    return await parseUUID(uuid).readIntBE(0, 16);
}
module.exports = uuidToInt;