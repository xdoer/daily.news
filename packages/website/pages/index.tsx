import DN from '@daily.news/types'
import { Box } from '@fower/react'
import { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import { useQuery } from '../utils'

export default function Home({}) {
  const ref = useRef<HTMLDivElement>()
  const [pageNo, setPageNo] = useState(0)
  const queryResponse = useQuery<DN.Api.QueryPosts>(
    '/posts',
    () => {
      return {
        params: {
          skip: 12 * pageNo,
          take: 12
        }
      }
    },
    {
      deps: [pageNo],
      onUpdate(value, prev) {
        if (prev) {
          const { result, ...rest } = value
          const { data, haveNext, totalItems } = result

          return {
            ...rest,
            result: {
              data: prev.result.data.concat(data),
              haveNext,
              totalItems
            }
          }
        }

        return value
      }
    }
  )

  useEffect(() => {
    function callback(e) {
      const { scrollTop, scrollHeight, clientHeight } = e.target
      // 没有下一页
      if (queryResponse.response?.result?.haveNext === false) {
        ref.current.removeEventListener('scroll', callback)
        return
      }

      // 加载中
      if (queryResponse.loading) return

      // 加载数据
      if (scrollHeight - scrollTop - clientHeight < 200) {
        setPageNo((i) => i + 1)
      }
    }

    ref.current.addEventListener('scroll', callback)
    return () => {
      ref.current.removeEventListener('scroll', callback)
    }
  }, [])

  const list = queryResponse.response?.result?.data || []

  return (
    <Layout ref={ref}>
      <Box grid gridTemplateColumns-3 gap-10>
        {list.map((item, idx) => {
          const { title, url, cover, date, tags, website, desc, author } = item

          return (
            <Box
              key={url}
              px-20
              pt-20
              pb-50
              mb-10
              bgWhite
              relative
              rounded-10
              shadowMedium
              shadowLarge--hover
              className={idx === list.length - 1 ? 'listItem' : ''}
            >
              <Box flex alignItems="center" mb-10>
                <Box as="img" src={website?.logo} circle8 mr-10 />
                <Box gray500 flex-1 flex justifyContent="space-between">
                  <Box text-10>{author.name}</Box>
                  <Box text-8 flex>
                    <Box text-10 flex gray500 borderRight="1px solid red">
                      {tags.map((tag) => (
                        <Box key={tag.name} mr-5>
                          {tag.name}
                        </Box>
                      ))}
                    </Box>
                    <Box>{date}</Box>
                  </Box>
                </Box>
              </Box>

              <Box flex justifyContent="space-between">
                <Box flex-1 pr-20>
                  <Box textXL fontBold className="ellipsis-2" mb-10>
                    {title}
                  </Box>
                  <Box textSM className="ellipsis-2" mb-10>
                    {desc}
                  </Box>
                </Box>

                {cover && <Box as="img" src={cover} h-100 rounded-10 mb-10 />}
              </Box>

              <Box
                bottom-10
                absolute
                left0
                right0
                flex
                justifyContent="space-around"
                text-10
              >
                工具条
              </Box>
            </Box>
          )
        })}
      </Box>
    </Layout>
  )
}
