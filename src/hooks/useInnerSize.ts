import { debounceTime, fromEvent, map } from 'rxjs'
import { useObservable } from 'rxjs-hooks'

export function useInnerSize (options?: {
  debounceTime?: number
}) {
  return useObservable(() => fromEvent(window, 'resize').pipe(
    map(() => ({
      width: window.innerWidth,
      height: window.innerHeight,
    })),
    debounceTime(options?.debounceTime || 300),
  ), {
    width: window.innerWidth,
    height: window.innerHeight,
  })
}
