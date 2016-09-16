import { put, take, call, select, fork } from 'redux-saga/effects'

import {
  fetchContents,
  match,
  changePage,
  changeTownDemand,
} from './actions.js'

import {
  pages,
} from 'util/index'

function* fetchContentsSaga() {
  while(true) {
    yield take(`${fetchContents}`)
    sendData('FETCH_CONTENTS')
  }
}

function* matchSaga() {
  while (true) {
    yield take(`${match}`)
    yield call(sendData, 'MATCH')
  }
}

function* changePageSaga() {
  while (true) {
    const { payload } = yield take(`${changePage}`)
    sendData('CHANGE_PAGE', payload)
    if (payload == 'description') {
      yield put(match())
    }
    if (payload == 'result') {
      const results = yield select(({ results }) => results) 
      sendData('SHOW_RESULTS', results)
    }
  }
}

function* changeTownDemandSaga() {
  while(true) {
    const { payload } = yield take(`${changeTownDemand}`)
    sendData('CHANGE_TOWN_DEMAND', payload)
  }
}

function* saga() {
  yield fork(fetchContentsSaga)
  yield fork(matchSaga)
  yield fork(changePageSaga)
  yield fork(changeTownDemandSaga)
}

export default saga
