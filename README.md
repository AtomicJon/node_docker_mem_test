# RSS Memory Testing

## Setup
- Install deps
```sh
cd app && yarn
```

- Bring up the containers
```sh
docker compose up
```

- Run the DB migrations
```sh
# Using alpine to migrate but could use either
docker compose exec alpine npx prisma migrate dev
```

- Seed the database
```sh
# Using alpine to seed but could use either
curl localhost:3100/seed | jq .
```

## Queries
- Stop/Start the containers between tests

### Prisma
- Query all 100 records
```sh
curl -Z localhost:3100/getAll localhost:3200/getAll | jq .
```

- Query a single record
```sh
curl -Z localhost:3100/get localhost:3200/get | jq .
```

- Get memory stats
```sh
curl -Z localhost:3100 localhost:3200 | jq .
```


### PgNode
- Query all 100 records
```sh
curl -Z localhost:3100/getAllPg localhost:3200/getAllPg | jq .
```

- Query a single record
```sh
curl -Z localhost:3100/getPg localhost:3200/getPg | jq .
```

- Get memory stats
```sh
curl -Z localhost:3100 localhost:3200 | jq .
```


