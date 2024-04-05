import { loadAgreement, host }  from 'agreeable-host'
host(await loadAgreement('./agreement.mjs', import.meta.url), {
  addTwo: ({a, b}) => a + b,
  randomName: () => 'bob'
})
