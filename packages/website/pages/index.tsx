import { Box } from '@fower/react'
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
                <Box key={url} flex flexWrap>
                  {data.map((i) => {
                    const { title, url, desc, cover } = i
                    return (
                      <Box
                        key={url}
                        square-300
                        overflowHidden
                        flexShrink-0
                        px-5
                        py-10
                        m-5
                        bgWhite
                        rounded-10
                        shadowMedium
                        onClick={() => window.open(url)}
                      >
                        <Box ml-10>
                          <Box textXL fontBold>
                            {title}
                          </Box>
                          <Box gray800>{desc}</Box>
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
