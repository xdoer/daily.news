import { Box } from '@fower/react'
import { Button } from 'antd'
import Layout from '../components/Layout'
import { useQuery } from '../utils'

export default function Home({}) {
  const { response } = useQuery<DN.Api.Posts[]>('/posts', {
    params: {
      skip: 0,
      take: 20
    }
  })

  const list = response?.data || []

  return (
    <Layout>
      <Box grid gridTemplateColumns-4 gap-10>
        {list.map((item) => {
          const { title, url, cover, date, tags, website } = item

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
            >
              <Box
                flex
                alignItems="center"
                mb-10
                justifyContent="space-between"
              >
                <Box as="img" src={website?.logo} circle8 mr-10 />
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
                onClick={() => window.open(url)}
              />
              <Box textSM fontBold className="ellipsis" mb-10 h-50>
                {title}
              </Box>
              <Box text-10 flex gray500>
                {tags.map((tag) => (
                  <Box key={tag.name} mr-5>
                    {tag.name}
                  </Box>
                ))}
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
                <Button>点赞</Button>
                <Button>收藏</Button>
                <Button>稍后读</Button>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Layout>
  )
}
