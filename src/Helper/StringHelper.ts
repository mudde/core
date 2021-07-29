export default class StringHelper {

  static ucfirst(value: string) {
    if (value === undefined) return

    return value.charAt(0).toUpperCase() + value.slice(1);
  }

}