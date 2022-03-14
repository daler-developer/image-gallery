
export const generateAvatarLetter = (username: string) => {
  return (username.charAt(0) + username.charAt(1)).toUpperCase()
}

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}
