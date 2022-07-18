export class Utils {
   public static formatDate(value: Date): string {
        let result = "";
        if (value) {
            result = value.getFullYear() + '-' +
                (value.getMonth() + 1) + '-' +
                value.getDate();
        }
        return result;
    }
}