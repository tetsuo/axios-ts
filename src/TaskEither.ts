import * as O from 'fp-ts/lib/Option'
import { identity } from 'fp-ts/lib/function'
import { pipe } from 'fp-ts/lib/function'
import { TaskEither } from 'fp-ts/lib/TaskEither'
import { Request } from './Client'
import { HttpError } from './Error'
import * as ax from './Axios'

export function toTaskEither<A>(req: Request<A>): TaskEither<HttpError, A> {
  return () =>
    ax
      .getPromiseAxiosResponse({
        method: req.method,
        headers: req.headers,
        url: req.url,
        data: req.body,
        timeout: pipe(
          req.timeout,
          O.fold(() => undefined, identity)
        ),
        withCredentials: req.withCredentials
      })
      .then(res => ax.axiosResponseToEither(res, req.expect))
      .catch(e => ax.axiosErrorToEither<A>(e))
}
