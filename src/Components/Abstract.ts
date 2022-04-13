import Store from 'Store/Abstract';

export default abstract class Component<IDefaultProps = Record<string, any>> {
  protected subscribeStore: Store[] = [];
  protected renderMethodList: TRenderMethodList = {};
  protected props: IDefaultProps;

  private childComponentList: TComponent[] = [];

  protected $component: HTMLElement | DocumentFragment;

  constructor(props) {
    this.props = props;
  }

  protected setDom() {}
  protected setEvents() {}
  protected abstract template(): HTMLElement | DocumentFragment;

  private addSubscriberStore() {
    this.subscribeStore.forEach(store => {
      store.addSubscriber(this.render);
      this.render({
        state: store.getState(),
        changedStateKeys: Object.keys(this.renderMethodList),
      });
    });
  }

  public mount() {
    this.$component = this.template();

    this.setDom();
    this.setEvents();

    this.addSubscriberStore();
  }

  public get content() {
    return this.$component;
  }

  public unmount() {
    this.subscribeStore.forEach(store => {
      store.removeSubscriber(this.render);
    });

    this.childComponentList.forEach(component => component.unmount());
  }

  private getRenderMethodList(changedStateKeys): TRenderDrawMethod[] {
    return changedStateKeys.reduce((previous, key) => {
      if (!this.renderMethodList[key]) return previous;

      previous.push(...this.renderMethodList[key]);
      return previous;
    }, []);
  }

  public render = ({ state, changedStateKeys }: TRenderContent) => {
    const renderTargetMethodList = new Set(this.getRenderMethodList(changedStateKeys));
    renderTargetMethodList.forEach((renderMethod: TRenderDrawMethod) => renderMethod(state));
  };

  protected createChildComponent<IProps = IDefaultProps>(
    ComponentClass: ClassConstructor<TComponent>,
    props: IProps,
  ) {
    const component: TComponent = new ComponentClass(props);
    component.mount();
    this.childComponentList.push(component);

    return component.content;
  }
}
