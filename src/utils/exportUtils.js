"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportToCSV = exportToCSV;
const date_fns_1 = require("date-fns");
function exportToCSV(data, start, end) {
    const dates = [];
    let current = (0, date_fns_1.parseISO)(start);
    const endDate = (0, date_fns_1.parseISO)(end);
    const oneDay = 86400000;
    while (current <= endDate) {
        dates.push((0, date_fns_1.format)(current, "yyyy/MM/dd"));
        current = new Date(current.getTime() + oneDay);
    }
    const csvLines = data.map((user) => {
        const scheduleMap = new Map(user.schedule.map((s) => [
            (0, date_fns_1.format)((0, date_fns_1.parseISO)(s.date), "yyyy/MM/dd"),
            s.shift,
        ]));
        const row = [
            user.id,
            user.name,
            ...dates.map((d) => scheduleMap.get(d) || ""),
        ];
        return row.join(",");
    });
    return ["ID,Nama," + dates.join(","), ...csvLines].join("\n");
}
