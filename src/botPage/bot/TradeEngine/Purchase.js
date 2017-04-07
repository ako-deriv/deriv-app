import { shouldThrowError, getBackoffDelay } from '../tools'

let delayIndex = 0

export default Engine => class Purchase extends Engine {
  purchase(contractType) {
    const toBuy = this.selectProposal(contractType)

    this.ongoingPurchase = true

    return new Promise((resolve, reject) => {
      this.api.buyContract(toBuy.id, toBuy.ask_price).then(r => {
        this.broadcastPurchase(r.buy, contractType)
        this.subscribeToOpenContract(r.buy.contract_id)
        this.renewProposalsOnPurchase()
        this.signal('purchase')
        delayIndex = 0
        resolve()
      }).catch(e => {
        if (shouldThrowError(e, ['PriceMoved'], delayIndex)) {
          reject(e)
          return
        }

        setTimeout(() => {
          // already requested by live api
          if (e.name !== 'DisconnectError') {
            this.renewProposalsOnPurchase()
          }

          this.waitForProposals().then(() => this.observer.emit('REVERT', 'before'))
        }, getBackoffDelay(e.name, delayIndex++))
      })
    })
  }
}
