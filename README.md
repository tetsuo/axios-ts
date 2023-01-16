# axios-ts

axios for [fp-ts](https://github.com/gcanti/fp-ts).

Originally extracted from an example @gcanti made.

## Usage

It works with `io-ts` types.

For example, you can get a list of most recent posts from my blog:

```ts
import * as t from 'io-ts'
import * as E from 'fp-ts/lib/Either'
import { toTaskEither } from '@onur1/axios-ts/lib/TaskEither'
import { get } from '@onur1/axios-ts/lib/Client'
import { expected } from '@onur1/axios-ts/lib/Expected'

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
