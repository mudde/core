import {StringHelper} from "../Helper/StringHelper"

export abstract class ConfigurableAbstract {

   configuring(config: any) {
      let defaultConfig = this.getDefaultConfig()

      for (let key in defaultConfig) {
         let methodName = 'configure' + StringHelper.ucfirst(key)
         let hasMethod = this[methodName] !== undefined
         let value = config[key] ? config[key] : defaultConfig[key]

         if (hasMethod) {
            this[methodName](value)
         } else {
            this[key] = value
         }
      }
   }

   abstract getDefaultConfig(): any
}