import {
  SignInComponent,
  SignUpComponent,
  ThumbnailComponent,
  EditInformationComponent,
} from './index';

export default class MembershipComponent {
  constructor() {
    new SignInComponent();
    new SignUpComponent();
    new ThumbnailComponent();
    new EditInformationComponent();
  }
}
