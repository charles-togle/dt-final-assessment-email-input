import { emails } from './emails'

export const fetchData = async () => {
  return new Promise(resolve => {
    setTimeout(async () => {
      resolve(emails)
    }, 500)
  })
}
