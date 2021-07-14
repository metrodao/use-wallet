import { Connector, EthereumProvider } from '../types'
import { ConnectionRejectedError } from '../errors'

export default async function init(): Promise<Connector> {
  const { ProvidedConnector, UserRejectedRequestError } = await import(
    '@aragon/provided-connector'
  )
  return {
    web3ReactConnector({
      supportedChains,
      provider,
    }: {
      supportedChains: [number]
      provider: EthereumProvider
    }) {
      return new ProvidedConnector({
        provider,
        supportedChainIds: supportedChains,
      })
    },
    handleActivationError(err: Error) {
      return err instanceof UserRejectedRequestError
        ? new ConnectionRejectedError()
        : null
    },
  }
}
