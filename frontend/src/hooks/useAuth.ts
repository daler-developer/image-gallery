import { useMemo } from "react"
import { authActions, selectCurrentUser, selectIsVerifyingToken } from "../redux/reducers/auth"
import { selectUserById, usersActions } from "../redux/reducers/users"
import useTypedDispatch from "./useTypedDispatch"
import useTypedSelector from "./useTypesSelector"

const useAuth = () => {
  const currentUser = useTypedSelector((state) => selectCurrentUser(state))
  const isVerifyingToken = useTypedSelector((state) => selectIsVerifyingToken(state))

  const dispatch = useTypedDispatch()

  const isAuthenticated = useMemo(() => Boolean(currentUser), [currentUser])
  const hasAvatar = useMemo(() => Boolean(currentUser?.avatarUrl), [currentUser])

  const login = async (username: string, password: string) => {
    const { token } = await dispatch(authActions.login({ username, password })).unwrap()

    localStorage.setItem('auth-token', token)
  }

  const register = async (username: string, password: string) => {
    const { token } = await dispatch(authActions.register({ username, password })).unwrap()

    localStorage.setItem('auth-token', token)
  }

  const logout = () => {
    dispatch(authActions.setCurrentUser(null))

    localStorage.removeItem('auth-token')
  }

  return {
    currentUser,
    isAuthenticated,
    hasAvatar,
    login,
    logout,
    register,
    isVerifyingToken
  }
}

export default useAuth
