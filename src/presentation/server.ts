import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasource.ts/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);
export class Server {
  public static start() {
    console.log("Server started...");
    CronService.createJob(
      "*/5 * * * * *",
      // () => new CheckService().execute('http://localhost:3000')
      () => {
        const url = "https://google.com";
        new CheckService(
          fileSystemLogRepository,
          () => console.log(`URL: ${url} is OK`),
          (error) => console.log(error)
        ).execute(url);
      }
    );
  }
}
