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


## Results
These are the just rough results from a single set of runs, but the rss difference is apparent and can be seen when running multiple times.

| Test Category       | Test                | OS     | RSS (MB)  | RSS Diff (MB)| RSS After (MB)| RSS Diff After (MB)|
|---------------------|---------------------|--------|-----------|--------------|---------------|--------------------|
| **Startup**         | Initial Load        | Alpine | 86.96     | 53.26        | -             | -                  |
|                     |                     | Debian | 84.68     | 52.22        | -             | -                  |
| **Prisma Queries**  | Query 100           | Alpine | 1261.68   | 13.89        | 262.73        | 48.00              |
|                     |                     | Debian | 1439.73   | 192.20       | 441.99        | **227.27**         |
|                     | Query 1             | Alpine | 102.76    | 73.78        | 103.01        | 74.03              |
|                     |                     | Debian | 109.07    | 80.34        | 109.32        | **80.59**          |
| **PgNode Queries**  | Query 100           | Alpine | 1103.00   | 54.85        | 83.67         | 68.07              |
|                     |                     | Debian | 925.59    | 69.18        | 114.55        | **99.20**          |
|                     | Query 1             | Alpine | 100.24    | 72.37        | 97.63         | 72.27              |
|                     |                     | Debian | 106.05    | 78.18        | 103.50        | **78.64**          |


### Startup

#### Alpine
```
alpine-1  | alpine started
alpine-1  | {
alpine-1  |   image: 'alpine',
alpine-1  |   rss: '86.96MB',
alpine-1  |   rssDiff: '53.26MB',
alpine-1  |   mem: {
alpine-1  |     rss: '86.96MB',
alpine-1  |     heapTotal: '33.71MB',
alpine-1  |     heapUsed: '14.70MB',
alpine-1  |     external: '2.13MB',
alpine-1  |     arrayBuffers: '0.02MB'
alpine-1  |   }
alpine-1  | }
```

#### Debian
```
debian-1  | debian started
debian-1  | {
debian-1  |   image: 'debian',
debian-1  |   rss: '84.68MB',
debian-1  |   rssDiff: '52.22MB',
debian-1  |   mem: {
debian-1  |     rss: '84.68MB',
debian-1  |     heapTotal: '32.46MB',
debian-1  |     heapUsed: '14.77MB',
debian-1  |     external: '2.13MB',
debian-1  |     arrayBuffers: '0.02MB'
debian-1  |   }
debian-1  | }
```

### Prisma - Query 100

#### Alpine
- Run
```
{
  "image": "alpine",
  "rss": "1261.68MB",
  "rssDiff": "13.89MB",
  "mem": {
    "rss": "1261.68MB",
    "heapTotal": "1247.79MB",
    "heapUsed": "1211.79MB",
    "external": "2.15MB",
    "arrayBuffers": "0.02MB"
  }
}
```
- Get stats after
```
{
  "image": "alpine",
  "rss": "262.73MB",
  "rssDiff": "48.00MB",
  "mem": {
    "rss": "262.73MB",
    "heapTotal": "214.72MB",
    "heapUsed": "211.86MB",
    "external": "2.15MB",
    "arrayBuffers": "0.02MB"
  }
}
```

#### Debian
- Run
```
{
  "image": "debian",
  "rss": "1439.73MB",
  "rssDiff": "192.20MB",
  "mem": {
    "rss": "1439.73MB",
    "heapTotal": "1247.54MB",
    "heapUsed": "1211.73MB",
    "external": "2.15MB",
    "arrayBuffers": "0.02MB"
  }
}
```
- Get stats after
```
{
  "image": "debian",
  "rss": "441.99MB",
  "rssDiff": "227.27MB",
  "mem": {
    "rss": "441.99MB",
    "heapTotal": "214.72MB",
    "heapUsed": "211.80MB",
    "external": "2.15MB",
    "arrayBuffers": "0.02MB"
  }
}
```

### Prisma - Query 1

#### Alpine
- Run
```
{
  "image": "alpine",
  "rss": "102.76MB",
  "rssDiff": "73.78MB",
  "mem": {
    "rss": "102.76MB",
    "heapTotal": "28.98MB",
    "heapUsed": "25.80MB",
    "external": "2.15MB",
    "arrayBuffers": "0.02MB"
  }
}
```
- Get stats after
```
{
  "image": "alpine",
  "rss": "103.01MB",
  "rssDiff": "74.03MB",
  "mem": {
    "rss": "103.01MB",
    "heapTotal": "28.98MB",
    "heapUsed": "25.96MB",
    "external": "2.15MB",
    "arrayBuffers": "0.02MB"
  }
}
```

#### Debian
- Run
```
{
  "image": "debian",
  "rss": "109.07MB",
  "rssDiff": "80.34MB",
  "mem": {
    "rss": "109.07MB",
    "heapTotal": "28.73MB",
    "heapUsed": "25.67MB",
    "external": "2.15MB",
    "arrayBuffers": "0.02MB"
  }
}
```
- Get stats after
```
{
  "image": "debian",
  "rss": "109.32MB",
  "rssDiff": "80.59MB",
  "mem": {
    "rss": "109.32MB",
    "heapTotal": "28.73MB",
    "heapUsed": "25.86MB",
    "external": "2.15MB",
    "arrayBuffers": "0.02MB"
  }
}
```

### PgNode - Query 100

#### Alpine
- Run
```
{
  "image": "alpine",
  "rss": "1103.00MB",
  "rssDiff": "54.85MB",
  "mem": {
    "rss": "1103.00MB",
    "heapTotal": "1048.15MB",
    "heapUsed": "1012.29MB",
    "external": "20.98MB",
    "arrayBuffers": "8.02MB"
  }
}
```
- Get stats after
```
{
  "image": "alpine",
  "rss": "83.67MB",
  "rssDiff": "68.07MB",
  "mem": {
    "rss": "83.67MB",
    "heapTotal": "15.61MB",
    "heapUsed": "12.67MB",
    "external": "2.17MB",
    "arrayBuffers": "0.02MB"
  }
}
```

#### Debian
- Run
```
{
  "image": "debian",
  "rss": "925.59MB",
  "rssDiff": "69.18MB",
  "mem": {
    "rss": "925.59MB",
    "heapTotal": "856.41MB",
    "heapUsed": "821.09MB",
    "external": "10.22MB",
    "arrayBuffers": "8.07MB"
  }
}
```
- Get stats after
```
{
  "image": "debian",
  "rss": "114.55MB",
  "rssDiff": "99.20MB",
  "mem": {
    "rss": "114.55MB",
    "heapTotal": "15.36MB",
    "heapUsed": "12.84MB",
    "external": "2.17MB",
    "arrayBuffers": "0.02MB"
  }
}
```

### PgNode - Query 1

#### Alpine
- Run
```
{
  "image": "alpine",
  "rss": "100.24MB",
  "rssDiff": "72.37MB",
  "mem": {
    "rss": "100.24MB",
    "heapTotal": "27.87MB",
    "heapUsed": "25.19MB",
    "external": "5.34MB",
    "arrayBuffers": "3.18MB"
  }
}
```
- Get stats after
```
{
  "image": "alpine",
  "rss": "97.63MB",
  "rssDiff": "72.27MB",
  "mem": {
    "rss": "97.63MB",
    "heapTotal": "25.36MB",
    "heapUsed": "22.30MB",
    "external": "5.34MB",
    "arrayBuffers": "3.17MB"
  }
}
```

#### Debian
- Run
```
{
  "image": "debian",
  "rss": "106.05MB",
  "rssDiff": "78.18MB",
  "mem": {
    "rss": "106.05MB",
    "heapTotal": "27.87MB",
    "heapUsed": "25.12MB",
    "external": "7.62MB",
    "arrayBuffers": "5.46MB"
  }
}
```
- Get stats after
```
{
  "image": "debian",
  "rss": "103.50MB",
  "rssDiff": "78.64MB",
  "mem": {
    "rss": "103.50MB",
    "heapTotal": "24.86MB",
    "heapUsed": "22.25MB",
    "external": "7.62MB",
    "arrayBuffers": "5.43MB"
  }
}
```
