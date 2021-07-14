import { Connector } from '../types'

export default async function init(): Promise<Connector> {
  const { TorusConnector } = await import('@web3-react/torus-connector')
  return {
    web3ReactConnector({
      supportedChains,
      initOptions,
      constructorOptions,
    }: {
      supportedChains: [number]
      initOptions: any
      constructorOptions: any
    }) {
      return new TorusConnector({
        chainId: supportedChains[0],
        constructorOptions,
        initOptions,
      })
    },
  }
}
