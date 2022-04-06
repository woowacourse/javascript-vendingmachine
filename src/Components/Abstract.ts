import Store from 'Store/Abstract';
import { TComponent } from 'Types/ComponentTypes';

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
        changedStateNames: Object.keys(this.renderMethodList),
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

  public render = ({ state, changedStateNames }: TRenderContent) => {
    const renderTargetMethod = changedStateNames.reduce((previous, stateKey) => {
      if (!this.renderMethodList[stateKey]) return previous;

      this.renderMethodList[stateKey].forEach(renderMethod => previous.add(renderMethod));
      return previous;
    }, new Set());
    renderTargetMethod.forEach((renderMethod: TRenderDrawMethod) => renderMethod(state));
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
