import { PrismaClient } from "@prisma/client";
import { Express } from "express";

class DatabaseService extends PrismaClient {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: Express) {
    return this.$on("beforeExit", async () => {
      await this.$disconnect();
      process.exit(1);
    });
  }
}

export { DatabaseService };
