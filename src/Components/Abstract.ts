import Store from 'Store/Abstract';

export default abstract class Component {
  protected subscriberStore: Store[] = [];
  protected renderMethodList = {};
  protected props;

  protected $component: HTMLElement | DocumentFragment;

  constructor(props) {
    this.props = props;
  }

  protected setDom() {}
  protected setEvents() {}
  protected abstract template(): HTMLElement | DocumentFragment;

  private addSubscriberStore() {
    this.subscriberStore.forEach(store => {
      store.addSubscriber(this.render);
      this.render({
        state: store.getState(),
        changedStateNames: Object.keys(this.renderMethodList),
      });
    });
  }

  public mount() {
    this.$component = this.template();

    this.setDom();
    this.setEvents();

    this.addSubscriberStore();

    return this.$component;
  }

  public unmount() {
    this.subscriberStore.forEach(store => {
      store.removeSubscriber(this.render);
    });
  }

  public render = ({ state, changedStateNames }) => {
    const renderTargetMethod = changedStateNames.reduce((previous, stateKey) => {
      if (!this.renderMethodList[stateKey]) return previous;

      this.renderMethodList[stateKey].forEach(renderMethod => previous.add(renderMethod));
      return previous;
    }, new Set());

    renderTargetMethod.forEach(renderMethod => renderMethod(state));
  };
}
