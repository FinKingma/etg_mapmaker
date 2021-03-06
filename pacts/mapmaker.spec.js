const verifier = require('pact').Verifier
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiAsPromised)
const server = require('../app.js')
if (!process.env.PACTBROKERURL) throw new Error('Please specify where the pactbroker can be found with PACTBROKERURL');
var pacttag = process.env.pacttag? process.env.pacttag : '';

server.listen(3000, () => {
  console.log('MapMaker Api listening on http://localhost:3000')
})

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  it('should validate the expectations of Matching Service', function () { // lexical binding required here
    this.timeout(30000);

    var opts = {
      provider: 'MapMakerApi',
      providerBaseUrl: 'http://localhost:3000',
      pactBrokerUrl: process.env.PACTBROKERURL,
      pactBrokerUsername: 'DPwCt3YC1WeNEX89vy4TAZbzoWkL5',
      pactBrokerPassword: 'uUZJtUmyOnutSoErGzTrGAXqmHMoy',
      //providerStatesUrl: 'http://localhost:3000/states',
      //providerStatesSetupUrl: 'http://localhost:3000/setup',
      tags: [pacttag],
      publishVerificationResult: (process.env.TAG === 'prod'),
      providerVersion: "1.1.0"
    }

    return verifier.verifyProvider(opts)
      .then(output => {
        console.log('Pact Verification Complete!')
        console.log(output)
      })
  })
})