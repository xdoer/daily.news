import { Box } from '@fower/react'
import { Button } from 'antd'
import {
  HeartOutlined,
  ArrowDownOutlined,
  HeartFilled
} from '@ant-design/icons'
import Layout from '../components/Layout'
import { useQuery } from '../utils'

export default function Home({}) {
  const { response } = useQuery<DN.Crawl.CrawlResponse[]>('/')
  const list = response?.data || []

  return (
    <Layout>
      {list.map((item) => {
        const { name, strategies, logo } = item
        return (
          <Box key={name}>
            <Box>{name}</Box>
            {strategies.map((strategy, i) => {
              const { data, url, tags } = strategy
              return (
                <Box key={url} grid gridTemplateColumns-4 gap-10>
                  {data.map((i) => {
                    const { title, url, cover, date, tags } = i
                    return (
                      <Box
                        key={url}
                        px-10
                        pt-10
                        pb-50
                        m-5
                        bgWhite
                        relative
                        rounded-10
                        shadowMedium
                        shadowLarge--hover
                        onClick={() => window.open(url)}
                      >
                        <Box
                          flex
                          alignItems="center"
                          mb-10
                          justifyContent="space-between"
                        >
                          <Box as="img" src={logo} circle8 mr-10></Box>
                          <Box text-10 gray500>
                            {date}
                          </Box>
                        </Box>
                        <Box
                          as="img"
                          src={cover}
                          w-100p
                          h-150
                          rounded-10
                          mb-10
                        ></Box>
                        <Box textSM fontBold className="ellipsis" mb-10 h-50>
                          {title}
                        </Box>
                        <Box text-10 flex gray500>
                          {tags.map((tag) => (
                            <Box key={tag} mr-5>
                              {tag}
                            </Box>
                          ))}
                        </Box>
                        <Box bottom-10 absolute>
                          <Button>点赞</Button>
                          <Button>收藏</Button>
                        </Box>
                      </Box>
                    )
                  })}
                </Box>
              )
            })}
          </Box>
        )
      })}
    </Layout>
  )
}
