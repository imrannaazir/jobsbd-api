"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSuperAdmin = void 0;
const http_status_1 = __importDefault(require("http-status"));
const auth_utils_1 = require("../../src/app/modules/auth/auth.utils");
const config_1 = __importDefault(require("../../src/config"));
const ApiError_1 = __importDefault(require("../../src/errors/ApiError"));
const prisma_1 = __importDefault(require("../../src/shared/prisma"));
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const email = config_1.default.super_admin.email;
    const password = yield (0, auth_utils_1.hashedPassword)(config_1.default.super_admin.password);
    const phoneNumber = config_1.default.super_admin.phone_number;
    try {
        if (!email || !password || !phoneNumber) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'SUPER_ADMIN configuration is missing in environment variables');
        }
        yield prisma_1.default.user.upsert({
            where: { email, phoneNumber },
            update: {},
            create: {
                email,
                password,
                phoneNumber,
                role: 'SUPER_ADMIN',
                status: 'ACTIVE',
            },
        });
        console.log('SUPER_ADMIN seeding completed');
    }
    catch (error) {
        console.error('Error seeding SUPER_ADMIN:', error);
    }
});
exports.seedSuperAdmin = seedSuperAdmin;
