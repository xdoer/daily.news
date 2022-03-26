import { Box } from '@fower/react'
import { Button } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import Layout from '../components/Layout'
import { useQuery } from '../utils'

export default function Home({}) {
  const { response } = useQuery<DN.Crawl.CrawlResponse[]>('/')
  const list = response?.data || []

  return (
    <Layout>
      {list.map((item) => {
        const { name, strategies } = item
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
                        <Box as="img" src={cover} w-100p h-150 rounded-10></Box>
                        <Box textXL fontBold className="ellipsis">
                          {title}
                        </Box>
                        <Box text-10 flex>
                          {tags.map((tag) => (
                            <Box key={tag} mr-5>
                              {tag}
                            </Box>
                          ))}
                        </Box>
                        <Box bottom-10 absolute>
                          <Button type="primary" icon={<ArrowUpOutlined />} />
                          <Button type="primary" icon={<ArrowDownOutlined />} />
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
