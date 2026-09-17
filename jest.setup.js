import '@testing-library/jest-dom'

// jest-environment-jsdom não expõe `crypto.randomUUID`, usado em
// components/NovaTarefa.tsx. Preenchemos com a implementação nativa do Node.
if (typeof globalThis.crypto === 'undefined' || typeof globalThis.crypto.randomUUID !== 'function') {
  const { webcrypto } = require('node:crypto')
  Object.defineProperty(globalThis, 'crypto', {
    value: webcrypto,
    configurable: true,
  })
}
