import { Config } from '@xdoer/script-runner/lib/types'
import { ChokidarArgs } from '@xdoer/chokidar'
import { MockArgs } from '@xdoer/mock'
const debounce = require('lodash/debounce')
import runScript from '@xdoer/script-runner/lib/runScript'

const debounceExec = debounce((script = '@xdoer/taro-router') => {
  console.log(`监听到变化, 脚本${script}执行中...`, script)
  runScript(config.scripts.find((v) => v.module === script)!)
}, 1000)

const basePath = process.cwd()

const config: Config = {
  scripts: [
    {
      module: '@xdoer/chokidar',
      args: <ChokidarArgs>[
        {
          options: { persistent: true, ignoreInitial: true },
          list: [
            {
              target: basePath + '/mock/routes/**.ts',
              watch: {
                change: () => {
                  debounceExec('@xdoer/mock')
                }
              }
            }
          ]
        }
      ]
    },
    {
      module: '@xdoer/mock',
      args: <MockArgs>[
        {
          port: 3002,
          mockDir: './mock/routes'
        }
      ],
      subProcess: true
    }
  ]
}

export default config
