/**
 * StringHelper for common string mainpulations
 *
 * @author        Olaf Mudde <olaf.mudde@xs4all.nl>
 * @copyright     (c) 2021
 * @license       MIT
 */
export class StringHelper {

  static ucFirst(value: string) {
    if (value === undefined) return

    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}