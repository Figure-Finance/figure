import React from 'react'
import PropTypes from 'prop-types'
import classes from './Input.module.css'

const Input = props => {
  let inputElement = null
  const classNames = [classes.Input]

  if (props.invalid && props.shouldValidate && props.touched) {
    classNames.push(classes.Invalid)
  }

  if (props.type === 'textarea') {
    classNames.push(classes.TextArea)
  }

  switch (props.type) {
    case ('input'):
      inputElement = (
        <input
          placeholder={props.placeholder}
          className={classNames.join(' ')}
          {...props.config}
          style={{ width: props.width || '100%' }}
          value={props.value}
          onChange={props.changed} />
      )
      break
    case ('textarea'):
      inputElement = (
        <textarea
          placeholder={props.placeholder}
          className={classNames.join(' ')}
          {...props.config}
          style={{ width: props.width || '100%' }}
          value={props.value}
          onChange={props.changed} />
      )
      break
    case ('select'):
      inputElement = (
        <select
          className={classNames.join(' ')}
          value={props.value}
          style={{ width: props.width || '100%' }}
          onChange={props.changed}>
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
          className={classNames.join(' ')}
          {...props.config}
          style={{ width: props.width || '100%' }}
          value={props.value}
          onChange={props.changed} />
      )
  }

  if (props.color === 'primary') {
    classNames.push(classes.Primary)
  } else if (props.color === 'neutral') {
    classNames.push(classes.Neutral)
  } else if (props.color === 'danger') {
    classNames.push(classes.Danger)
  }

  // let validationError = null
  // if (props.invalid && props.touched) {
  //   validationError = (
  //     <p className={classes.ValidationError}>
  //       Please enter a valid {props.valueType}
  //     </p>
  //   )
  // }

  return inputElement
}

Input.propTypes = {
  color: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.string,
  value: PropTypes.string,
  changed: PropTypes.func,
  touched: PropTypes.bool,
  invalid: PropTypes.bool.isRequired,
  valueType: PropTypes.string,
  shouldValidate: PropTypes.object,
  type: PropTypes.string,
  config: PropTypes.object
}

export default Input
