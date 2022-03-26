import { create } from '@prequest/xhr'
import createQueryHook from '@prequest/use-request'

const SERVER = 'http://localhost:3001'
const MOCK = 'http://localhost:3002'

export const request = create({
  baseURL: MOCK
  // baseURL: SERVER,
})

// parse response
request.use(async (ctx, next) => {
  await next()
  const { status, data } = ctx.response
  if (status === 200) {
    console.log(data)
    ctx.response.data = JSON.parse(data)
  }
})

export const useQuery = createQueryHook(request)
