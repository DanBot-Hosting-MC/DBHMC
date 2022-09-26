

//Upcoming database server.

//Fetch database uptime
global.dbUptime = async function dbUptime() {
    const out = await axios.get(config.db + `/uptime`);
    return out.data;
}

