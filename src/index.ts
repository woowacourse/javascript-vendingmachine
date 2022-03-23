import './scss/index.scss';
import ProductAdditionUI from './ts/ui/ProductManagementUI/ProductAdditionUI';
import ProductInventoryUI from './ts/ui/ProductManagementUI/ProductInventoryUI';
import ProductManagementDomain from './ts/domain/ProductManagement';
import ViewPainter from './ts/ui/ViewPainter';

const productManagementDomain = new ProductManagementDomain();
const productAdditionUI = new ProductAdditionUI(productManagementDomain);
const productInventoryUI = new ProductInventoryUI(productManagementDomain);

export const viewPainter = new ViewPainter(productInventoryUI);
