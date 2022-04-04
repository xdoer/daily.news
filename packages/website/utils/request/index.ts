import { create } from '@prequest/xhr'
import createQueryHook from '@prequest/use-request'
import generatorMiddlewareWrapper from '@prequest/response-types-client'

const SERVER = 'http://localhost:3001'
const MOCK = 'http://localhost:3002'

export const request = create({
  // baseURL: MOCK
  baseURL: SERVER
})

const typesGeneratorMiddleware = generatorMiddlewareWrapper({
  enable: true,
  httpAgent: create({ baseURL: 'http://localhost:10010' }),
  outPutDir: './api-types',
  typesGeneratorConfig(req, res) {
    const { path } = (req || {}) as any
    if (!path) throw new Error('path not found')

    const outPutName = path.replace(/.*\/(\w+)/, (_, __) => __)
    const interfaceName = outPutName.replace(/^[a-z]/, (g) => g.toUpperCase())

    return {
      data: res,
      outPutName,
      interfaceName,
      overwrite: false
    }
  }
})

// parse response
request.use(typesGeneratorMiddleware).use(async (ctx, next) => {
  await next()
  const { status, data } = ctx.response
  if (status === 200) {
    ctx.response = JSON.parse(data)
  }
})

export const useQuery = createQueryHook(request)
