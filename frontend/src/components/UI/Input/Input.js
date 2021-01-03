import React from 'react'
import PropTypes from 'prop-types'
import classes from './Input.module.css'

const Input = props => {
  let inputElement = null
  const labelClassNames = [classes.Label]
  const inputClassNames = [classes.Input]

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClassNames.push(classes.Invalid)
  }

  if (props.type === 'textarea') {
    inputClassNames.push(classes.TextArea)
  }

  const moveLabel = event => {
    event.target.style.transform = 'translateY(0px)'
    console.log(event.target.style.transform)
  }

  switch (props.type) {
    case ('input'):
      inputElement = (
        <input
          className={inputClassNames.join(' ')}
          {...props.config}
          style={{ width: props.width || '100%' }}
          value={props.value}
          onFocus={e => moveLabel(e)}
          onChange={props.onChange} />
      )
      break
    case ('textarea'):
      inputElement = (
        <textarea
          className={inputClassNames.join(' ')}
          {...props.config}
          style={{ width: props.width || '100%' }}
          value={props.value}
          onChange={props.onChange} />
      )
      break
    case ('select'):
      inputElement = (
        <select
          className={inputClassNames.join(' ')}
          value={props.value}
          style={{ width: props.width || '100%' }}
          onChange={props.onChange}>
          {props.config.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      )
      break
    default:
      inputElement = (
        <input
          className={inputClassNames.join(' ')}
          {...props.config}
          style={{ width: props.width || '100%' }}
          value={props.value}
          onChange={props.onChange} />
      )
  }

  if (props.color === 'primary') {
    inputClassNames.push(classes.Primary)
    labelClassNames.push(classes.Primary)
  } else if (props.color === 'neutral') {
    inputClassNames.push(classes.Neutral)
    labelClassNames.push(classes.Neutral)
  } else if (props.color === 'danger') {
    inputClassNames.push(classes.Danger)
    labelClassNames.push(classes.Danger)
  }

  // let validationError = null
  // if (props.invalid && props.touched) {
  //   validationError = (
  //     <p className={classes.ValidationError}>
  //       Please enter a valid {props.valueType}
  //     </p>
  //   )
  // }

  return (
    <>
      <label
        className={labelClassNames.join(' ')}
        onClick={e => moveLabel(e)}>
        {props.config.placeholder}
      </label>
      {inputElement}
    </>
  )
}

Input.propTypes = {
  color: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  touched: PropTypes.bool,
  invalid: PropTypes.bool.isRequired,
  valueType: PropTypes.string,
  shouldValidate: PropTypes.object,
  type: PropTypes.string,
  config: PropTypes.object
}

export default Input
