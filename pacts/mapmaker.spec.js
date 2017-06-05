const verifier = require('pact').Verifier
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiAsPromised)
const server = require('../app.js')

server.listen(3000, () => {
  console.log('MapMaker Api listening on http://localhost:3000')
})

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  it('should validate the expectations of Matching Service', function () { // lexical binding required here
    this.timeout(10000)
    if (!process.env.PACTBROKERURL) Throw new Error('Please specify where the pactbroker can be found with PACTBROKERURL')

    var opts = {
      provider: 'MapMakerApi',
      providerBaseUrl: 'http://localhost:3000',
      //providerStatesUrl: 'http://localhost:3000/states',
      //providerStatesSetupUrl: 'http://localhost:3000/setup',
      // Fetch pacts from broker
      pactBrokerUrl: process.env.PACTBROKERURL,
      // Fetch from broker with given tags
      //tags: ['prod', 'sit5'],
      // Specific Remote pacts (doesn't need to be a broker)
      // pactUrls: ['https://test.pact.dius.com.au/pacts/provider/Animal%20Profile%20Service/consumer/Matching%20Service/latest'],
      // Local pacts
      // pactUrls: [path.resolve(process.cwd(), './pacts/matching_service-animal_profile_service.json')],
      //pactBrokerUsername: 'dXfltyFMgNOFZAxr8io9wJ37iUpY42M',
      //pactBrokerPassword: 'O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1',
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