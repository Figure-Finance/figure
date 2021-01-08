import React from 'react'
import PropTypes from 'prop-types'
import classes from './Input.module.css'

const Input = ({
  color,
  placeholder,
  width,
  value,
  onChange,
  touched,
  invalid,
  valueType,
  shouldValidate,
  type,
  config
}) => {
  let inputElement = null
  const labelClassNames = [classes.Label]
  const inputClassNames = [classes.Input]

  if (color === 'primary') {
    inputClassNames.push(classes.Primary)
    labelClassNames.push(classes.Primary)
  } else if (color === 'neutral') {
    inputClassNames.push(classes.Neutral)
    labelClassNames.push(classes.Neutral)
  } else if (color === 'danger') {
    inputClassNames.push(classes.Danger)
    labelClassNames.push(classes.Danger)
  }

  if (invalid && shouldValidate && touched) {
    inputClassNames.push(classes.Invalid)
  }

  if (type === 'textarea') {
    inputClassNames.push(classes.TextArea)
  }

  // const moveLabelOut = event => {
  //   event.target.style.transform = 'translateY(0px)'
  //   console.log(event.target.parentElement)
  // }

  // const moveLabelIn = event => {
  //   event.target.style.transform = 'translateY(40px)'
  // }

  switch (type) {
    case ('input'):
      inputElement = (
        <input
          className={inputClassNames.join(' ')}
          {...config}
          style={{ width: width || '100%' }}
          value={value}
          onChange={onChange} />
      )
      break
    case ('textarea'):
      inputElement = (
        <textarea
          className={inputClassNames.join(' ')}
          {...config}
          style={{ width: width || '100%' }}
          value={value}
          onChange={onChange} />
      )
      break
    case ('select'):
      inputElement = (
        <select
          className={inputClassNames.join(' ')}
          value={value}
          style={{ width: width || '100%' }}
          onChange={onChange}>
          {config.options.map(option => (
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
          {...config}
          style={{ width: width || '100%' }}
          value={value}
          onChange={onChange} />
      )
  }

  // let validationError = null
  // if (invalid && touched) {
  //   validationError = (
  //     <p className={classes.ValidationError}>
  //       Please enter a valid {valueType}
  //     </p>
  //   )
  // }

  return (
    <>
      <label
        className={labelClassNames.join(' ')}>
        {config.label}
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
