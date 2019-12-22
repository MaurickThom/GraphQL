export const getIp = req =>{
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return ip;
}