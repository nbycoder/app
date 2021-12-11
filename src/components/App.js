import React, { useReducer } from 'react';
import { Global } from '../style/Global';
import { Calc, Output, Two, Btn } from '../style/App'
import DigitBtn from './DigitBtn';
import OperationBtn from './OperationBtn';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, {type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) { //~ when you type a digit after calculating your values, it overwrites your current calculation
        return {
          ...state,
          curr: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.curr === "0") { //~ if the first number added is 0 return current state; this prevents from adding a ton of 0s
        return state
      }
      if (payload.digit === "." && state.curr.includes(".")) { //~ prevents it from adding multiple periods
        return state
      }
      return { //* state object
        ...state,  //* current state
        curr: `${state.curr || ""}${payload.digit}`, //* current operand, adds a digit to the end of it
      }
    case ACTIONS.CLEAR:
      return {} //~ initial state defined in useReducer
    case ACTIONS.CHOOSE_OPERATION:
      if (state.curr == null && state.prev == null) {
        return state //~ if there is no value in current or previous operands returns state (which is nothing)
      }
      if (state.curr == null) { //~ to change our operation without altering values
        return {
          ...state,
          operation: payload.operation,
        }
      }
      if (state.prev == null) {
        return {
          ...state,
          operation: payload.operation, //~ set operation
          prev: state.curr, //~ set previous operand to current operand (allows the number to be moved up basically)
          curr: null //~ empties current field
        }
      }
      return {
        ...state,
        prev: evaluate(state), //* takes the state and evaluates it with the operation selected v
        operation: payload.operation,
        curr: null //* after calculating the two values sets current value to null
      }
    case ACTIONS.DELETE_DIGIT:
      //~ if we're in the overwrite state, delete current operand
      if(state.overwrite) return {
        ...state,
        overwrite: false,
        curr: null
      }
      if(state.curr == null) { //~ if our current operand is null return our current state (because we can't delete anything from this)
        return state
      }
      if(state.curr.length === "1") { //~ if there's only one number left in our current operand remove it completely
        return {
          ...state,
          curr: null,
        }
      }
      return {
        ...state,
        curr: state.curr.slice(0, -1) //~ delete the last digit
      }
    case ACTIONS.EVALUATE:
      //~ if we don't have all our information, return our current state (do nothing)
      if(state.curr == null || state.prev == null || state.operation == null) {
        return state;
      }
      //~ else calculate
      return {
        ...state,
        prev: null,
        overwrite: true, 
        operation: null,
        curr: evaluate(state)
      }
    default: 
      return state
  }
}

function evaluate({ curr, prev, operation }) {
  //~ convert values assigned in evaluate to numbers
  const previous = parseFloat(prev)
  const current = parseFloat(curr)

  //~ if the values don't exist return an empty string
  if(isNaN(previous) || isNaN(current)) {
    return ""
  }
    let computation = "" //~ our computation results in nothing (initial value)
    switch(operation) { //~ allows us to do the different operations
      case "+":
        computation = previous + current
        break;
      case "-":
        computation = previous - current
        break;
      case "*":
        computation = previous * current
        break;
      case "÷":
        computation = previous / current
        break;
      default:
        return ""
    }
    return computation.toString()
}

//! Formatting our integer
const INT_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0
})

function formatOperand(operand) {
  if (operand == null) return //~ operand equal to none don't do anything
  const [integer, decimal] = operand.split(".") //~ split on the decimal
  if (decimal == null) return INT_FORMATTER.format(integer) //~ if there's no decimal take the integer and format it
    return `${INT_FORMATTER.format(integer)}.${decimal}` //~ this keeps the decimal portion with no formatting
}

function App() {
  const [{curr, prev, operation}, dispatch] = useReducer(reducer, {})
  return (
    <>
    <Global />
      <Calc>
        <Output>
          <div className="prev">{formatOperand(prev)} {operation}</div>
          <div className="curr">{formatOperand(curr)}</div>
        </Output>
        <Two onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</Two>
        <Btn onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</Btn>
        <OperationBtn operation="÷" dispatch={dispatch} />
        <DigitBtn digit="1" dispatch={dispatch} />
        <DigitBtn digit="2" dispatch={dispatch} />
        <DigitBtn digit="3" dispatch={dispatch} />
        <OperationBtn operation="*" dispatch={dispatch} />
        <DigitBtn digit="4" dispatch={dispatch}/>
        <DigitBtn digit="5" dispatch={dispatch}/>
        <DigitBtn digit="6" dispatch={dispatch}/>
        <OperationBtn operation="+" dispatch={dispatch} />
        <DigitBtn digit="7" dispatch={dispatch}/>
        <DigitBtn digit="8" dispatch={dispatch}/>
        <DigitBtn digit="9" dispatch={dispatch}/>
        <OperationBtn operation="-" dispatch={dispatch} />
        <DigitBtn digit="." dispatch={dispatch}/>
        <DigitBtn digit="0" dispatch={dispatch}/>
        <Two onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</Two>
      </Calc>
      </>
  );
}

export default App;
