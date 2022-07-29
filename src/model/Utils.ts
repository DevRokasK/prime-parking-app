
export class Utils {
    // Returns formated Date as string
    public static formatDate(value: Date): string {
        let result = "";
        if (value) {
            let month = "" + (value.getMonth() + 1);
            let day = "" + value.getDate();

            if (month.length < 2)
                month = "0" + month;
            if (day.length < 2)
                day = "0" + day;

            result = value.getFullYear() + '-' + month + '-' + day;
        }
        return result;
    }
}