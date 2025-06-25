import { stringReplace } from '@/NCZ/utils'

// NOTE: 掛載到 String 的原型上，以便更方便的使用。
if (!Object.prototype.hasOwnProperty.call(String, 'stringReplace')) {
  // eslint-disable-next-line no-extend-native
  String.prototype.stringReplace = function (target: string, replacement: string): string {
    return stringReplace(this, target, replacement)
  }
}

export {}
