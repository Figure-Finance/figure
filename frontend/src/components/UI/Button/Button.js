import React from 'react'
import PropTypes from 'prop-types'
import classes from './Button.module.css'
import ButtonProgressBar from './ButtonProgressBar/ButtonProgressBar'

const Button = ({
  children,
  color,
  size,
  active,
  onClick,
  dual,
  secondary,
  width,
  disabled,
  showProgress,
  progressPercent
}) => {
  const classNames = [classes.Button]
  let content = children

  if (color === 'primary') {
    classNames.push(classes.Primary)
  } else if (color === 'neutral') {
    classNames.push(classes.Neutral)
  } else if (color === 'danger') {
    classNames.push(classes.Danger)
  } else {
    classNames.push(classes.Default)
  }

  if (size === 'large') {
    classNames.push(classes.Large)
  } else if (size === 'medium') {
    classNames.push(classes.Medium)
  } else if (size === 'small') {
    classNames.push(classes.Small)
  } else if (size === 'square') {
    classNames.push(classes.Square)
  } else if (size === 'smallSquare') {
    classNames.push(classes.SquareSmall)
  } else if (size === 'thin') {
    classNames.push(classes.Thin)
  }

  if (active) {
    classNames.push(classes.Active)
  }

  if (showProgress) {
    classNames.push(classes.ShowProgress)
  } else if (dual) {
    classNames.push(classes.Dual)
  }

  if (secondary) {
    content = (
      <div className={classes.ButtonInfo}>
        <span>
          {children}
        </span>
        <span className={classes.Split}></span>
        <span>
          {secondary}
        </span>
      </div>
    )
  }

  if (showProgress) {
    content = (
      <>
        <div className={classes.TopRow}>
          <div className={classes.ButtonInfo}>
            <span>
              {children}
            </span>
            <span className={classes.Split}></span>
            <span>
              {secondary}
            </span>
          </div>
        </div>
        <div className={classes.BottomRow}>
          <ButtonProgressBar
            percent={progressPercent}
            color={color} />
        </div>
      </>
    )
  }

  return (
    <button
      className={classNames.join(' ')}
      onClick={onClick}
      style={{ width: width }}
      disabled={disabled}>
      {content}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
  size: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  dual: PropTypes.bool,
  secondary: PropTypes.string,
  width: PropTypes.string,
  disabled: PropTypes.bool,
  showProgress: PropTypes.bool,
  progressPercent: PropTypes.number
}

export default Button
