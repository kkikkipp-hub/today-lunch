# Testing

100% test coverage is the key to great vibe coding. Tests let you move fast, trust your instincts, and ship with confidence — without them, vibe coding is just yolo coding. With tests, it's a superpower.

## Framework

**Vitest v4** with `happy-dom` environment (avoids jsdom ESM incompatibility with Node 22+).

## Run tests

```bash
npm test          # single run
npm run test:watch  # watch mode
```

## Test layers

- **Unit tests** — pure logic: `src/data/menus.ts` (recommendMenus), `src/utils/history.ts` (storage utilities)
- **Integration tests** — add when testing component interactions with real state
- **E2E** — browser-based QA via `/qa`

## Conventions

- Test files: `src/test/*.test.ts`
- Setup file: `src/test/setup.ts` (imports jest-dom matchers)
- `beforeEach(() => localStorage.clear())` for any test touching storage
- Use `happy-dom` — `jsdom` v29 breaks with Node 22 due to ESM top-level await in `@asamuzakjp/css-color`
- Assert specific values, never `toBeDefined()` alone

## Expectations

- Write a test when you write a new function
- Write a regression test when you fix a bug
- When adding a conditional (if/else), test both paths
- Never commit code that breaks existing tests
