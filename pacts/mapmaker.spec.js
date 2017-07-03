const verifier = require('pact').Verifier
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiAsPromised)
const server = require('../app.js')
if (!process.env.PACTBROKERURL) throw new Error('Please specify where the pactbroker can be found with PACTBROKERURL');

server.listen(3000, () => {
  console.log('MapMaker Api listening on http://localhost:3000')
})

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  it('should validate the expectations of Matching Service', function () { // lexical binding required here
    this.timeout(10000)

    var opts = {
      provider: 'MapMakerApi',
      providerBaseUrl: 'http://localhost:3000',
      pactBrokerUrl: process.env.PACTBROKERURL,
      //providerStatesUrl: 'http://localhost:3000/states',
      //providerStatesSetupUrl: 'http://localhost:3000/setup',
      tags: ['prod'],
      publishVerificationResult: true,
      providerVersion: "1.0.0"
    }

    return verifier.verifyProvider(opts)
      .then(output => {
        console.log('Pact Verification Complete!')
        console.log(output)
      })
  })
})