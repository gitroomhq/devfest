import {CronAbstract, QueueInterface} from "@backend/runners/runners.interface";
import * as schedule from "node-schedule";
import { parseExpression } from "cron-parser";
import { green } from "cli-color";
import moment from "moment";
import {QueueEvents, Worker} from 'bullmq';
import IORedis from 'ioredis';
import Redis from "ioredis/built/Redis";

let conn: Redis;
export const getConnection = () => {
    conn = conn || new IORedis(process.env.REDIS_URL!, {
      maxRetriesPerRequest: null
    });
    return conn;
}

export const CronService = (cron: CronAbstract<any>[]) => {
    return cron.map((s) => {
        const scheduleTime = s.schedule();
        if (s.autostart()) {
            s.handle();
        }

        console.log(
            green(
                `[CRON] ${s.name().toUpperCase()}: Next Run ${moment(
                    parseExpression(scheduleTime).next().toDate()
                ).format("DD/MM/YYYY HH:mm")}`
            )
        );
        schedule.scheduleJob(s.schedule(), () => s.handle());
    });
};

export const QueueService = (queue: QueueInterface<any>[]) => {
    const connection = getConnection();
    return queue.map((s) => {
        console.log(
            green(
                `[QUEUE] Listening to queue ${s.name()}`
            )
        );

        const queueEvents = new QueueEvents(s.name(), {
            connection,
        });
        queueEvents.on('completed', ({ jobId }) => {
            console.log(`processed ${s.name()} ${jobId}`);
        });
        new Worker(s.name(), async job => {
            await s.handle(job.data);
        }, {
            limiter: {
                max: 1,
                duration: 1000,
            },
            removeOnComplete: { count: 0 },
            removeOnFail: { count: 0 },
            concurrency: s.numWorkers(),
            autorun: true,
            connection
        });
    });
};

