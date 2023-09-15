import { Subscription } from 'rxjs'

export class SubscriptionManager {
    private subscriptions: Subscription[] = []

    set Add(subscription: Subscription) {
        this.subscriptions.push(subscription)
    }

    public Dispose(): void {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe()
        })
        this.subscriptions = []
    }
}
