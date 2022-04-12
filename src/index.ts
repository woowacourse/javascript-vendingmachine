import './css/index.css';

import './ui/ProductManagement';
import './ui/ChargeTab';
import './ui/PurchaseTab';
import './ui/SigninPage';
import './ui/SignupPage';
import './ui/EditProfilePage';

import './router';
import Auth from './domain/Auth';
import MainUI from './ui/MainUI';

new Auth();
new MainUI();
