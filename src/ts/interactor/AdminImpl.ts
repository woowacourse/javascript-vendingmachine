import { VendingMachine, Admin, Product, ProductName, AdminEmail, AdminPassword, AdminData, AdminName } from '../../index.d';
import { ERROR_MESSAGE } from '../constant';
import VendingMachineImpl from '../entity/VendingMachineImpl';
import validator from './validator';
import API from './API';
import JsonAPI from '../jsonAPI/JsonAPI';

export default class AdminImpl implements Admin {
  public readonly vendingMachine: VendingMachine;
  public adminName: string;
  private adminId: number;
  private adminKey: string;
  private api: API;
  private static instance: Admin;

  static getInstance() {
    if (!this.instance) {
      this.instance = new AdminImpl();
    }

    return this.instance;
  }

  constructor() {
    this.vendingMachine = VendingMachineImpl.getInstance();
    this.api = new JsonAPI();
  }

  addProduct(product: Product): void {
    this.throwAuthError();
    validator.checkAdditionalProduct(product, this.vendingMachine.products);
    this.vendingMachine.addProduct(product);
  }

  modifyProduct(product: Product, originProductName: ProductName): void {
    this.throwAuthError();
    validator.checkModifiedProduct(product, this.vendingMachine.products, this.vendingMachine.getProductIndex(originProductName));
    this.vendingMachine.modifyProduct(product, originProductName);
  }

  deleteProduct(name: ProductName): void {
    this.throwAuthError();
    if (this.vendingMachine.getProductIndex(name) === -1) throw new Error(ERROR_MESSAGE.NOT_EXIST_PRODUCT);
    this.vendingMachine.deleteProduct(name);
  }

  chargeMoney(inputMoney: number): void {
    this.throwAuthError();
    validator.checkChargeMoney(inputMoney, this.vendingMachine.calculateTotalAmount());
    this.vendingMachine.generateCoins(inputMoney);
  }

  async signup(adminData: AdminData) {
    validator.checkSignupAdmin(adminData);
    await this.api.signup(adminData);
  }

  logout(): void {
    if (!this.isLogin()) throw new Error('이미 로그아웃 상태입니다.');

    this.adminName = '';
    this.adminId = 0;
    this.adminKey = '';
  }

  async modifyAdmin(adminData: AdminData) {
    this.throwAuthError();
    validator.checkModifyAdmin(adminData);
    await this.api.modifyAdmin(adminData, this.adminId, this.adminKey);
    this.adminName = adminData.name;
  }
  
  async login(email: AdminEmail, password: AdminPassword) {
    validator.checkLogin(email, password);
    const adminData = await this.api.login(email, password);
    this.adminId = adminData.id;
    this.adminKey = adminData.key;
    this.adminName = adminData.name;
  }

  isLogin(): boolean {
    return !!this.adminId && !!this.adminKey && !! this.adminName;
  }

  async getAdmin() {
    return await this.api.getEmail(this.adminId, this.adminKey);
  }

  private throwAuthError() {
    if (!this.isLogin()) throw new Error('권한이 없습니다!');
  }
}
