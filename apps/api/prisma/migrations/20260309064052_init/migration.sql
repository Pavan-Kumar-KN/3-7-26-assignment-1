-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "number" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_number_key" ON "Student"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
