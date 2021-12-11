import React from 'react'
import { ACTIONS } from './App'
import { Btn } from '../style/App'

function DigitBtn({ dispatch, digit }) {
    return <Btn onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit }})}>{ digit }</Btn>
}

export default DigitBtn
