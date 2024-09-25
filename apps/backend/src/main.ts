import { CronService, QueueService } from "@backend/services/runner/runner.service";
import "cli-color";
import {config} from 'dotenv'
import {ScoreCron} from "@backend/runners/cron/score.cron";
import {ScoreQueue} from "@backend/runners/queues/score.queue";
// import {UpdateWinnersCron} from "@backend/runners/cron/update.winners.cron";
// import {UpdateWinnersQueue} from "@backend/runners/queues/update.winners.queue";
// import {DevToArticlesCron} from "@backend/runners/cron/dev.to.articles.cron";

config();

(async () => {
    CronService([
      // new DevToArticlesCron(),
      new ScoreCron(),
      // new UpdateWinnersCron(),
      // new NovuCron()
  ]);

  QueueService([
      new ScoreQueue(),
      // new UpdateWinnersQueue()
  ]);
})();
