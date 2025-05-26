## Prisma Cheat Sheet

### ⚙️ INIT & GENERATE

```bash
npx prisma init            # Sets up Prisma in your project (schema, .env, etc.)
npx prisma generate        # Generates Prisma Client (after editing schema)
```

---

### 🛠️ DB MANAGEMENT

```bash
npx prisma migrate dev --name <name>      # Create & apply new migration (dev mode)
npx prisma migrate reset                  # Drops DB, runs all migrations, seeds
npx prisma db push                        # Push schema to DB WITHOUT migrations
```

---

### 🔎 STUDIO & INTROSPECTION

```bash
npx prisma studio          # Launches the Prisma GUI to view/edit DB
npx prisma db pull         # Introspect DB schema (use with existing DB)
```

---

### 🔬 MODELING

- Edit `prisma/schema.prisma` to define models.
- Then run:

```bash
npx prisma generate
```

---

### 💣 RESET EVERYTHING (dangerous but useful in dev)

```bash
npx prisma migrate reset
```

---

A **migration** in Prisma (or any database system) is a **set of instructions** that describes how to **change the structure of your database** — things like:

- Creating or deleting tables
- Adding/removing columns
- Changing data types
- Adding indexes or constraints

---

### 🔄 Think of it like this:

You write or edit models in `schema.prisma` (your blueprint), and **Prisma generates a migration** to make the actual **database match your new blueprint**.

---

### 🧱 Example

Let's say your schema changes from:

```prisma
model User {
  id    Int     @id @default(autoincrement())
  name  String
}
```

to:

```prisma
model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
```

Running this:

```bash
npx prisma migrate dev --name add-email-to-user
```

Creates a migration file (SQL or Prisma format), and applies it to your DB to add that `email` column.

---

### 🧠 TL;DR

> A **migration** is like a commit for your database structure — it tracks and applies changes so your DB evolves with your code.
