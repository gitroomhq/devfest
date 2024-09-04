import {Queue} from "bullmq";
import {getConnection} from "../services/runner/runner.service";

export interface QueueInterface<T> {
  name(): string;
  numWorkers(): number;
  handle(arg: T): Promise<void>;
}

const queueList: any = {};

export abstract class CronAbstract<T>{
  abstract name(): string;
  abstract handle(): void;
  abstract schedule(): string;
  abstract autostart(): boolean;
  pushQueue(data: T, delay = 0) {
    const connection = getConnection();
    queueList[this.name()] = queueList[this.name()] || new Queue(this.name(), {
      connection
    });
    queueList[this.name()].add('', data, {delay})
  }
}