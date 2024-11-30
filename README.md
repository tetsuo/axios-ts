# axios-ts

axios for [fp-ts](https://github.com/gcanti/fp-ts).

Originally extracted from [elm-ts](https://github.com/gcanti/elm-ts/tree/0.4.4/src/Http.ts).

## Usage

It works with `io-ts` types.

For example, you can get a list of most recent posts from my blog:

```ts
import * as t from 'io-ts'
import * as E from 'fp-ts/lib/Either'
import { toTaskEither } from '@tetsuo/axios-ts/lib/TaskEither'
import { get } from '@tetsuo/axios-ts/lib/Client'
import { expected } from '@tetsuo/axios-ts/lib/Expected'

const Entry = t.type({
  title: t.string,
  description: t.string,
  slug: t.string,
})

const Response = t.type({
  entries: t.array(Entry),
})

const program = toTaskEither(get('https://ogu.nz/index.json', expected(Response)))

program().then(E.bimap(console.error, console.log))
```
