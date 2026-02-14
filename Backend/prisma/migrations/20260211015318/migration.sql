/*
  Warnings:

  - The values [RUNNING,WA] on the enum `STATUS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "STATUS_new" AS ENUM ('PENDING', 'AC', 'FAILED', 'TLE', 'RE');
ALTER TABLE "public"."submission" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "submission" ALTER COLUMN "status" TYPE "STATUS_new" USING ("status"::text::"STATUS_new");
ALTER TABLE "submission_result" ALTER COLUMN "verdict" TYPE "STATUS_new" USING ("verdict"::text::"STATUS_new");
ALTER TYPE "STATUS" RENAME TO "STATUS_old";
ALTER TYPE "STATUS_new" RENAME TO "STATUS";
DROP TYPE "public"."STATUS_old";
ALTER TABLE "submission" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
