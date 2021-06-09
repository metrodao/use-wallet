import { getNetworkName } from './utils'

export class ChainUnsupportedError extends Error {
  constructor(
    unsupportedChainId: number,
    supportedChainIds: [number],
    ...params: any[]
  ) {
    super(...params)

    this.name = 'ChainUnsupportedError'
    this.message =
      `Unsupported chain: ${getNetworkName(unsupportedChainId)}${
        unsupportedChainId === -1 ? '' : ` (Chain ID: ${unsupportedChainId})`
      }. ` +
      `Supported chains: ${supportedChainIds
        .map((chainId) => `(${getNetworkName(chainId)}, ID: ${chainId})`)
        .join(', ')}.`
  }
}

export class ConnectorUnsupportedError extends Error {
  constructor(connectorId: string, ...params: any[]) {
    super(...params)
    this.name = 'ConnectorUnsupportedError'
    this.message = `Unsupported connector: ${connectorId}.`
  }
}

export class ConnectionRejectedError extends Error {
  constructor(...params: any[]) {
    super(...params)
    this.name = 'ConnectionRejectedError'
    this.message = `The activation has been rejected by the provider.`
  }
}

export class ConnectorConfigError extends Error {
  constructor(...params: any[]) {
    super(...params)
    this.name = 'ConnectorConfigError'
  }
}
