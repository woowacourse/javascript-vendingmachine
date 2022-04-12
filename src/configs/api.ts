export const SERVER =
  process.env.NODE_ENV === 'development'
    ? ('http://localhost:3000' as const)
    : ('https://vendingmachin-json-server-auth.herokuapp.com' as const);
