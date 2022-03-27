import { Box } from '@fower/react'

export default function Layout({ children }) {
  return (
    <Box as="main" w-100vw h-100vh flex flexDirection="column">
      <Box
        w-100p
        h-50
        borderBottom
        flex
        justifyContent="space-between"
        alignItems="center"
        px-20
      >
        <Box>Daily.News</Box>
        <Box>xdoer</Box>
      </Box>
      <Box flex flex-1>
        <Box h-100p w-200 p-20>
          左侧导航
        </Box>
        <Box flex-1 p-20 h="calc(100vh - 50px)" overflow="scroll" bgGray100>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
