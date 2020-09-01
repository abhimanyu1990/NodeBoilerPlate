import * as redis from "redis";
import GlobalObjects from "../app/globalObjects";


export default class RedisConnect {


    public static client: redis.RedisClient;
    //const host= "192.168.0.113";
    //const port = 6379;
    constructor() {

        const host = GlobalObjects.app.get("db.redis.host");
        const port = GlobalObjects.app.get("db.redis.port");
        RedisConnect.client = redis.createClient({
            host: host,
            port: port
        });
        RedisConnect.client.on("error", function (error: any) {
            console.error(error);
        });
    }


}
