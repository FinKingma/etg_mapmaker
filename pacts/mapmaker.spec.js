const verifier = require('pact').Verifier
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
chai.use(chaiAsPromised)
const server = require('../app.js')
const importData = require('../app.js')
const animalRepository = require('../app.js')

// Append some extra endpoints to mutate current state of the API
server.get('/states', (req, res) => {
  res.json({
    "Matching Service": ['Has some animals', 'Has no animals', 'Has an animal with ID 1']
  })
})

server.post('/setup', (req, res) => {
  const state = req.body.state

  animalRepository.clear()
  switch (state) {
    case 'Has no animals':
      // do nothing
      break
    default:
      importData()
  }

  res.end()
})

server.listen(3000, () => {
  console.log('Animal Profile Service listening on http://localhost:3000')
})

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  it('should validate the expectations of Matching Service', function () { // lexical binding required here
    this.timeout(10000)

    var opts = {
      provider: 'MapMakerApi',
      providerBaseUrl: 'http://localhost:3000',
      providerStatesUrl: 'http://localhost:3000/states',
      providerStatesSetupUrl: 'http://localhost:3000/setup',
      // Fetch pacts from broker
      pactBrokerUrl: 'http://54.197.31.162:80',
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