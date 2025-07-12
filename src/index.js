"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Main API
app.use("/api", apiRoutes_1.default);
app.get("/", (_, res) => res.send("Shift Scheduling API"));
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "test")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
exports.default = app;
