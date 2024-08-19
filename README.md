# Blog Starter

This is a [Next.js](https://nextjs.org/) fullstack project (server components, server actions) bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

App is web template with user-posts-categories-comments standard blog pattern and session auth, postgres database,
image upload(local dev only) and css modules for styling.

Besides NextJS following libraries are used in the project:

- [React Hook Form](https://www.npmjs.com/package/react-hook-form)
- [React Quill](https://www.npmjs.com/package/react-quill)
- [DOMPurify](https://www.npmjs.com/package/dompurify)
- [React Hot Toast](https://www.npmjs.com/package/react-hot-toast)
- [Zod - typeScript first schema validation](https://zod.dev/)
- [Prisma ORM](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma)
- [Iron Session](https://www.npmjs.com/package/iron-session)

## Getting Started

You will need a node.js runtime environment:

- [Node.js](https://nodejs.org/en/)

and docker-compose for running the postgres database and adminer (db viewer) in the container:

- [Docker Compose Install](https://docs.docker.com/compose/install/)

## Next:

- clone or download repository

- copy .env.example and rename to .env and write down required information values,
  the POSTGRES_USER, POSTGRES_PASSWORD, and POSTGRES_DB keys will be read in the docker-compose.yml file also.

- write same values for the USER,PASSWORD,DATABASE in the DATABASE_URL key needed for the
  prisma connection string.

- create some random generated string for the session secret

Open terminal in the project folder root...

## Instalattion

Packages installation:

```bash
npm install
```

Database:

- to run docker-compose write following command, it will pull postgres and adminer images from docker hub and
  start in the detached mode, and also it will create local persistent postgres volume:

```bash
docker-compose up -d
```

To stop docker services write command:

```bash
docker-compose down
```

Prisma ORM:

- to create the database according to schema.prisma file write (case for the local dev and no migrations files):

```bash
npx prisma db push
```

- to seed categories entries into database write following command:

```bash
npx prisma db seed
```

## Adminer

For the adminer open [http://localhost:8080](http://localhost:8080) with your browser to see the adminer login page,
the server name in the login page is the name of the postgres service from docker-compose.yml file, so pg_blog

## Prisma Studio

Or maybe to check prisma studio, write following command:

```bash
npx prisma studio
```

open [http://localhost:5555](http://localhost:5555) with your browser to see the prisma studio.

## App

Nextjs development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
