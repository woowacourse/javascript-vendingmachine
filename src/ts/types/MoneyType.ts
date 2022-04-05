export default interface MoneyType {
  value: number;
  count: number;
  increaseCount(): void;
  deductCount(refundableCount: number): void;
}
