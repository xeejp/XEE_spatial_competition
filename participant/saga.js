import { fork, take, call } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'

import { fetchContents, submitTown } from './actions.js'


function* fetchContentsSaga() {
  yield take(`${fetchContents}`)
  sendData('FETCH_CONTENTS')
}

function* submitTownSaga() {
  const { payload } = yield take(`${submitTown}`)
  sendData('SUBMIT_TOWN', payload)
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(submitTownSaga)
}

export default saga
