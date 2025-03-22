import { redirect } from 'react-router'
import { destroySession, getSession } from '~/sessions.server'
import type { Route } from './+types/route'

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  return redirect('/sign-in', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  })
}

export default function SignOut() {
  return <p>Logging out...</p>
}
