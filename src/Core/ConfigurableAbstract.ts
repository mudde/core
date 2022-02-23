/**
 * This will automatically configure your object
 * 
 * example
 * ---------------
 * import { ConfigurableAbstract } from "../node_modules/mudde-core/src/Core/ConfigurableAbstract";
 * 
 * export class Form extends ConfigurableAbstract {
 * 
 *    private _id: string = ''                   //  <-- empty init
 *    private _languages: string[] = []
 * 
 *    constructor(config: any) {
 *       super()
 * 
 *       this.configuring(config)
 *    }
 * 
 *    getDefaultConfig(): any {                 //  <-- set the default values of all 
 *       return {                               //      the fields you want to configure
 *          id: GuidHelper.raw(),
 *          languages: ['nl'],
 *       }
 *    }
 * 
 *    private configureLanguages(rawFields: Object[]): void {     //  <-- if you want some extra checks
 *       .. your code here                                        //      or create a new object create
 *    }                                                           //      a method with the following signature
 *                                                                //      configure<property name>(rawFields: Object[]): void
 *  }
 *
 * @author        Olaf Mudde <olaf.mudde@xs4all.nl>
 * @copyright     (c) 2021
 * @license       MIT
 */
import { StringHelper } from "../Helper/StringHelper"

export abstract class ConfigurableAbstract{

   configuring(config: any) {
      let defaultConfig = this.getDefaultConfig()

      for (let key in defaultConfig) {
         let methodName = 'configure' + StringHelper.ucFirst(key)
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