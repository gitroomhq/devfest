import {CronAbstract} from "../runners.interface";
import {prisma} from "@db/prisma";

export class ScoreCron extends CronAbstract<string> {
    name() {
        return "Scores";
    }

    autostart(): boolean {
        return true;
    }

    schedule() {
        return '0 */2 * * *';
    }

    async start(page =  1, perPage = 10) {
        const list = await prisma.squad.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
            select: {
                id: true
            }
        });

        await Promise.all(list.map((p) => {
            return this.pushQueue(JSON.stringify({id: p.id}));
        }));

        if (list.length === perPage) {
            await this.start(page + 1, perPage);
        }
    }

    async handle() {
        await this.start(1, 10);
    }
}
