import { createAction } from 'redux-actions'

export const fetchContents = createAction('FETCH_CONTENTS')

export const changeChartTurn = createAction('CHANGE_CHART_TURN')
export const fallChartButton = createAction('FALL_CHART_BUTTON')

export const submitTown = createAction('SUBMIT_TOWN')
