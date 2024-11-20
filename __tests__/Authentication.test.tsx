import '@testing-library/jest-dom'
import userLogIn from '@/libs/userLogIn'
import getUserProfile from '@/libs/getUserProfile'

describe('Remote User Log-In', () => {
  var logInPromise: Promise<LoginJson>
  var logInJsonResult: LoginJson
  var token: string
  var profilePromise: Promise<ProfileJson>
  var profileJsonResult: ProfileJson

  beforeAll(async () => {
    const email = "joi@test.com"
    const password = "root1234"
    logInPromise = userLogIn(email, password)
    logInJsonResult = await logInPromise

    token = logInJsonResult.token
    profilePromise = getUserProfile(token)
    profileJsonResult = await profilePromise
  })

  it('userLogIn must return correct results', () => {
    expect(logInJsonResult.email).toMatch(/joi@test.com/i)
  })

  it('getUserProfile must return correct results', () => {
    var profileData = profileJsonResult.data
    expect(profileData.email).toMatch(/joi@test.com/i)
    expect(profileData.role).toMatch(/user/i)
  })
})
