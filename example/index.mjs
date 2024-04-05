import { loadAgreement, host }  from 'agreeable-host'
const agreement = await loadAgreement('./agreement.mjs', import.meta.url)

const impl = {}
impl.addTwo = ({a, b}) => a + b
impl.randomName = () => 'bob'

host(agreement, impl)

