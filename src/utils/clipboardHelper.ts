export default class ClipboardHelper {
  public static setString(text: string): boolean {
    try {
      const aux = document.createElement("textarea");
      aux.hidden = false;
      document.body.appendChild(aux);
      aux.value = text;
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      return true;
    } catch {
      return false;
    }
  }
}
