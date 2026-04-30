import { test } from "@playwright/test"

export function step(stepName: string) {
  return function decorator(
    target: Function,
  ) {
    return function replacementMethod(...args: any) {
      const name = `${stepName} (${this.constructor.name}) ${args.join(', ')}`
      return test.step(name, async () => {
        return await target.call(this, ...args)
      })
    }
  }
}