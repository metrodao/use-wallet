import { Connector } from '../types'
import { ConnectionRejectedError, ConnectorConfigError } from '../errors'

export default async function init(): Promise<Connector> {
  const { UserRejectedRequestError, WalletConnectConnector } = await import(
    '@web3-react/walletconnect-connector'
  )
  return {
    web3ReactConnector({
      supportedChains,
      rpcUrl,
      bridge,
      pollingInterval,
    }: {
      supportedChains: [number]
      rpcUrl: string
      bridge: any
      pollingInterval: number
    }) {
      if (!rpcUrl) {
        throw new ConnectorConfigError(
          'The WalletConnect connector requires rpcUrl to be set.'
        )
      }
      if (!/^https?:\/\//.test(rpcUrl)) {
        throw new ConnectorConfigError(
          'The WalletConnect connector requires rpcUrl to be an HTTP URL.'
        )
      }
      return new WalletConnectConnector({
        bridge,
        pollingInterval,
        qrcode: true,
        rpc: { [supportedChains[0]]: rpcUrl },
      })
    },
    handleActivationError(err: Error) {
      return err instanceof UserRejectedRequestError
        ? new ConnectionRejectedError()
        : null
    },
  }
}
