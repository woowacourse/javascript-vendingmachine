export default function createRandomUserData() {
  return { email: `${Date.now()}@test.com`, name: 'test', password: 'abcd1234!!' };
}
