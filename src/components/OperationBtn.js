import React from 'react'
import { ACTIONS } from './App'
import { Btn } from '../style/App'

function OperationBtn({ dispatch, operation }) {
    return <Btn onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: { operation }})}>{ operation }</Btn>
}

export default OperationBtn

