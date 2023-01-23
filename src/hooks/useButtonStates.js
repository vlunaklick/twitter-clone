import { useState } from 'react'

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

export const useButtonStates = () => {
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)

  const handleLoadingState = () => {
    setStatus(COMPOSE_STATES.LOADING)
  }

  const handleSuccessState = () => {
    setStatus(COMPOSE_STATES.SUCCESS)
  }

  const handleErrorState = () => {
    setStatus(COMPOSE_STATES.ERROR)
  }

  const handleUserNotKnowState = () => {
    setStatus(COMPOSE_STATES.USER_NOT_KNOW)
  }

  return {
    status,
    handleLoadingState,
    handleSuccessState,
    handleErrorState,
    handleUserNotKnowState,
    COMPOSE_STATES,
  }
}
