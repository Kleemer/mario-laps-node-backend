# Mario Laps Node API

## Development

Please use prettier to format your javascript.

## Docker development

To start a development environment:

```bash
docker-compose up
```

The development environment:

- Can be run using docker-compose.
- Will hot-reload when you make code changes (whether running from docker, or not).
- In addition to unit tests, integration tests allow database access.
- Auto-generates OpenAPI documentation.

| | |
| --- | --- |
| Host | localhost:9292 |
| Username | root |
| Password | password |
| Database | mariolaps |

The development environment will print a valid authorization code to the console.

```bash
curl -X GET \
  http://localhost:9001/health \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.c2VjcmV0.udiKGw1jE4RG7-Tx5BY0D-rV4HFvyXJEXE-2D3-YQBo'
```

## Local development

Create a local `.env` file. Copy `.env.sample` as a starting point.

To start the required infrastructure:

```bash
docker-compose up database migration
```

Then to start the app:

```bash
yarn install
yarn run dev
```

The project contains both unit, and integration tests. All tests are run using ts-jest, so we do not compile `.ts` to
`.js` before running the tests.

Integration tests will access the database and any other infrastructure that is spun up
using `docker-compose`. Ensure you have run:

`docker-compose -f docker-compose.test.yml up`

Then, to run the tests:

```bash
yarn test
```
