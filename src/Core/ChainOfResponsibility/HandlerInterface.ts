/**
 * Chain of responsibility interface
 *
 * @author        Olaf Mudde <olaf.mudde@xs4all.nl>
 * @copyright     (c) 2021
 * @license       MIT
 */
export interface HandlerInterface {

  setNext(event: HandlerInterface):HandlerInterface
  handle(data: any):any

}