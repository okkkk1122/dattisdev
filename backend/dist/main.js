/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.controller.ts":
/*!*******************************!*\
  !*** ./src/app.controller.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
    getHealth() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHealth", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const app_controller_1 = __webpack_require__(/*! ./app.controller */ "./src/app.controller.ts");
const app_service_1 = __webpack_require__(/*! ./app.service */ "./src/app.service.ts");
const storage_module_1 = __webpack_require__(/*! ./storage/storage.module */ "./src/storage/storage.module.ts");
const content_module_1 = __webpack_require__(/*! ./content/content.module */ "./src/content/content.module.ts");
const email_module_1 = __webpack_require__(/*! ./email/email.module */ "./src/email/email.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            storage_module_1.StorageModule,
            content_module_1.ContentModule,
            email_module_1.EmailModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),

/***/ "./src/app.service.ts":
/*!****************************!*\
  !*** ./src/app.service.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AppService = class AppService {
    getHello() {
        return 'Enterprise API is running!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),

/***/ "./src/content/content.controller.ts":
/*!*******************************************!*\
  !*** ./src/content/content.controller.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContentController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const content_service_1 = __webpack_require__(/*! ./content.service */ "./src/content/content.service.ts");
const content_dto_1 = __webpack_require__(/*! ./dto/content.dto */ "./src/content/dto/content.dto.ts");
let ContentController = class ContentController {
    constructor(contentService) {
        this.contentService = contentService;
    }
    getAll() {
        return this.contentService.getAll();
    }
    getPosts() {
        return this.contentService.getPosts();
    }
    setPosts(body) {
        return this.contentService.setPosts(body);
    }
    getPortfolio() {
        return this.contentService.getPortfolio();
    }
    setPortfolio(body) {
        return this.contentService.setPortfolio(body);
    }
    getTestimonials() {
        return this.contentService.getTestimonials();
    }
    setTestimonials(body) {
        return this.contentService.setTestimonials(body);
    }
    getPricing() {
        return this.contentService.getPricing();
    }
    setPricing(body) {
        return this.contentService.setPricing(body);
    }
    getFaq() {
        return this.contentService.getFaq();
    }
    setFaq(body) {
        return this.contentService.setFaq(body);
    }
    getSettings() {
        return this.contentService.getSettings();
    }
    updateSettings(body) {
        return this.contentService.updateSettings(body);
    }
    syncAll(body) {
        return this.contentService.syncAll(body);
    }
};
exports.ContentController = ContentController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all site content' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('posts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Put)('posts'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "setPosts", null);
__decorate([
    (0, common_1.Get)('portfolio'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "getPortfolio", null);
__decorate([
    (0, common_1.Put)('portfolio'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "setPortfolio", null);
__decorate([
    (0, common_1.Get)('testimonials'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "getTestimonials", null);
__decorate([
    (0, common_1.Put)('testimonials'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "setTestimonials", null);
__decorate([
    (0, common_1.Get)('pricing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "getPricing", null);
__decorate([
    (0, common_1.Put)('pricing'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "setPricing", null);
__decorate([
    (0, common_1.Get)('faq'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "getFaq", null);
__decorate([
    (0, common_1.Put)('faq'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "setFaq", null);
__decorate([
    (0, common_1.Get)('settings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "getSettings", null);
__decorate([
    (0, common_1.Put)('settings'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof content_dto_1.UpdateSettingsDto !== "undefined" && content_dto_1.UpdateSettingsDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "updateSettings", null);
__decorate([
    (0, common_1.Post)('sync'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof Record !== "undefined" && Record) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "syncAll", null);
exports.ContentController = ContentController = __decorate([
    (0, swagger_1.ApiTags)('content'),
    (0, common_1.Controller)('content'),
    __metadata("design:paramtypes", [typeof (_a = typeof content_service_1.ContentService !== "undefined" && content_service_1.ContentService) === "function" ? _a : Object])
], ContentController);


/***/ }),

/***/ "./src/content/content.module.ts":
/*!***************************************!*\
  !*** ./src/content/content.module.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContentModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const content_controller_1 = __webpack_require__(/*! ./content.controller */ "./src/content/content.controller.ts");
const content_service_1 = __webpack_require__(/*! ./content.service */ "./src/content/content.service.ts");
let ContentModule = class ContentModule {
};
exports.ContentModule = ContentModule;
exports.ContentModule = ContentModule = __decorate([
    (0, common_1.Module)({
        controllers: [content_controller_1.ContentController],
        providers: [content_service_1.ContentService],
        exports: [content_service_1.ContentService],
    })
], ContentModule);


/***/ }),

/***/ "./src/content/content.service.ts":
/*!****************************************!*\
  !*** ./src/content/content.service.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContentService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const storage_service_1 = __webpack_require__(/*! ../storage/storage.service */ "./src/storage/storage.service.ts");
let ContentService = class ContentService {
    constructor(storage) {
        this.storage = storage;
    }
    getPosts() {
        return this.storage.get('posts');
    }
    async setPosts(posts) {
        return this.storage.set('posts', posts);
    }
    getPortfolio() {
        return this.storage.get('portfolio');
    }
    async setPortfolio(portfolio) {
        return this.storage.set('portfolio', portfolio);
    }
    getTestimonials() {
        return this.storage.get('testimonials');
    }
    async setTestimonials(testimonials) {
        return this.storage.set('testimonials', testimonials);
    }
    getPricing() {
        return this.storage.get('pricing');
    }
    async setPricing(pricing) {
        return this.storage.set('pricing', pricing);
    }
    getFaq() {
        return this.storage.get('faq');
    }
    async setFaq(faq) {
        return this.storage.set('faq', faq);
    }
    getSettings() {
        const settings = this.storage.get('settings');
        const { smtpPass, ...safe } = settings;
        return { ...safe, smtpPass: smtpPass ? '********' : '' };
    }
    async updateSettings(settings) {
        return this.storage.updateSettings(settings);
    }
    getAll() {
        return {
            posts: this.getPosts(),
            portfolio: this.getPortfolio(),
            testimonials: this.getTestimonials(),
            pricing: this.getPricing(),
            faq: this.getFaq(),
            settings: this.getSettings(),
        };
    }
    async syncAll(data) {
        if (data.posts)
            await this.setPosts(data.posts);
        if (data.portfolio)
            await this.setPortfolio(data.portfolio);
        if (data.testimonials)
            await this.setTestimonials(data.testimonials);
        if (data.pricing)
            await this.setPricing(data.pricing);
        if (data.faq)
            await this.setFaq(data.faq);
        return this.getAll();
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof storage_service_1.StorageService !== "undefined" && storage_service_1.StorageService) === "function" ? _a : Object])
], ContentService);


/***/ }),

/***/ "./src/content/dto/content.dto.ts":
/*!****************************************!*\
  !*** ./src/content/dto/content.dto.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateSettingsDto = exports.ContactDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class ContactDto {
}
exports.ContactDto = ContactDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ContactDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], ContactDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ContactDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ContactDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContactDto.prototype, "locale", void 0);
class UpdateSettingsDto {
}
exports.UpdateSettingsDto = UpdateSettingsDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "siteName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "contactEmail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "contactPhone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "smtpHost", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateSettingsDto.prototype, "smtpPort", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "smtpUser", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "smtpPass", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "smtpFrom", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "mailDomain", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSettingsDto.prototype, "harakaInboundSecret", void 0);


/***/ }),

/***/ "./src/email/dto/inbound-email.dto.ts":
/*!********************************************!*\
  !*** ./src/email/dto/inbound-email.dto.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InboundEmailDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class InboundEmailDto {
}
exports.InboundEmailDto = InboundEmailDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InboundEmailDto.prototype, "secret", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InboundEmailDto.prototype, "from", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], InboundEmailDto.prototype, "to", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InboundEmailDto.prototype, "subject", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InboundEmailDto.prototype, "body", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], InboundEmailDto.prototype, "receivedAt", void 0);


/***/ }),

/***/ "./src/email/email.controller.ts":
/*!***************************************!*\
  !*** ./src/email/email.controller.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const email_service_1 = __webpack_require__(/*! ./email.service */ "./src/email/email.service.ts");
const content_dto_1 = __webpack_require__(/*! ../content/dto/content.dto */ "./src/content/dto/content.dto.ts");
const inbound_email_dto_1 = __webpack_require__(/*! ./dto/inbound-email.dto */ "./src/email/dto/inbound-email.dto.ts");
let EmailController = class EmailController {
    constructor(emailService) {
        this.emailService = emailService;
    }
    sendContact(dto) {
        return this.emailService.sendContactEmail(dto);
    }
    receiveInbound(dto) {
        return this.emailService.receiveInboundEmail(dto);
    }
    getInbox() {
        return this.emailService.getInbox();
    }
    markRead(id, read) {
        return this.emailService.markRead(id, read !== false);
    }
    deleteEmail(id) {
        return this.emailService.deleteEmail(id);
    }
    getStatus() {
        return this.emailService.getStatus();
    }
    testConnection() {
        return this.emailService.testConnection();
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.Post)('contact'),
    (0, swagger_1.ApiOperation)({ summary: 'Send contact form email' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof content_dto_1.ContactDto !== "undefined" && content_dto_1.ContactDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "sendContact", null);
__decorate([
    (0, common_1.Post)('inbound'),
    (0, swagger_1.ApiOperation)({ summary: 'Haraka inbound webhook' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof inbound_email_dto_1.InboundEmailDto !== "undefined" && inbound_email_dto_1.InboundEmailDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "receiveInbound", null);
__decorate([
    (0, common_1.Get)('inbox'),
    (0, swagger_1.ApiOperation)({ summary: 'List inbox emails' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "getInbox", null);
__decorate([
    (0, common_1.Patch)('inbox/:id/read'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark email read/unread' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('read')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "markRead", null);
__decorate([
    (0, common_1.Delete)('inbox/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete inbox email' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "deleteEmail", null);
__decorate([
    (0, common_1.Get)('status'),
    (0, swagger_1.ApiOperation)({ summary: 'Haraka / SMTP status' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Post)('test'),
    (0, swagger_1.ApiOperation)({ summary: 'Test SMTP connection' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmailController.prototype, "testConnection", null);
exports.EmailController = EmailController = __decorate([
    (0, swagger_1.ApiTags)('email'),
    (0, common_1.Controller)('email'),
    __metadata("design:paramtypes", [typeof (_a = typeof email_service_1.EmailService !== "undefined" && email_service_1.EmailService) === "function" ? _a : Object])
], EmailController);


/***/ }),

/***/ "./src/email/email.module.ts":
/*!***********************************!*\
  !*** ./src/email/email.module.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const email_controller_1 = __webpack_require__(/*! ./email.controller */ "./src/email/email.controller.ts");
const email_service_1 = __webpack_require__(/*! ./email.service */ "./src/email/email.service.ts");
let EmailModule = class EmailModule {
};
exports.EmailModule = EmailModule;
exports.EmailModule = EmailModule = __decorate([
    (0, common_1.Module)({
        controllers: [email_controller_1.EmailController],
        providers: [email_service_1.EmailService],
        exports: [email_service_1.EmailService],
    })
], EmailModule);


/***/ }),

/***/ "./src/email/email.service.ts":
/*!************************************!*\
  !*** ./src/email/email.service.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const nodemailer = __webpack_require__(/*! nodemailer */ "nodemailer");
const storage_service_1 = __webpack_require__(/*! ../storage/storage.service */ "./src/storage/storage.service.ts");
let EmailService = EmailService_1 = class EmailService {
    constructor(storage) {
        this.storage = storage;
        this.logger = new common_1.Logger(EmailService_1.name);
    }
    getSmtpConfig() {
        const settings = this.storage.get('settings');
        return {
            host: process.env.SMTP_HOST || settings.smtpHost || 'haraka',
            port: Number(process.env.SMTP_PORT || settings.smtpPort || 25),
            user: settings.smtpUser || process.env.SMTP_USER || '',
            pass: settings.smtpPass || process.env.SMTP_PASS || '',
            from: settings.smtpFrom || process.env.SMTP_FROM || 'info@dattisdev.com',
            contactEmail: settings.contactEmail ||
                process.env.CONTACT_EMAIL ||
                'info@dattisdev.com',
            mailDomain: settings.mailDomain || process.env.MAIL_DOMAIN || 'dattisdev.com',
        };
    }
    getTransporter() {
        const { host, port, user, pass } = this.getSmtpConfig();
        if (!host)
            return null;
        const options = {
            host,
            port,
            secure: port === 465,
            tls: { rejectUnauthorized: false },
        };
        if (user && pass) {
            options.auth = { user, pass };
        }
        return nodemailer.createTransport(options);
    }
    async sendContactEmail(dto) {
        const { from, contactEmail } = this.getSmtpConfig();
        const transporter = this.getTransporter();
        const html = `
      <h2>پیام جدید از فرم تماس - DattisDev</h2>
      <p><strong>نام:</strong> ${dto.name}</p>
      <p><strong>ایمیل:</strong> ${dto.email}</p>
      <p><strong>تلفن:</strong> ${dto.phone || '-'}</p>
      <p><strong>موضوع:</strong> ${dto.subject}</p>
      <p><strong>زبان:</strong> ${dto.locale || 'fa'}</p>
      <hr/>
      <p>${dto.message.replace(/\n/g, '<br/>')}</p>
    `;
        const plainBody = [
            `نام: ${dto.name}`,
            `ایمیل: ${dto.email}`,
            `تلفن: ${dto.phone || '-'}`,
            `موضوع: ${dto.subject}`,
            `زبان: ${dto.locale || 'fa'}`,
            '',
            dto.message,
        ].join('\n');
        if (!transporter) {
            await this.storage.addEmail({
                from: dto.email,
                to: [contactEmail],
                subject: `[Contact] ${dto.subject}`,
                body: plainBody,
                receivedAt: new Date().toISOString(),
                read: false,
                source: 'contact',
            });
            this.logger.warn(`SMTP unavailable — contact saved to inbox from ${dto.email}`);
            return {
                success: true,
                mode: 'inbox',
                message: 'Message saved to inbox',
            };
        }
        try {
            await transporter.sendMail({
                from,
                to: contactEmail,
                replyTo: dto.email,
                subject: `[DattisDev Contact] ${dto.subject}`,
                html,
                text: plainBody,
            });
            return { success: true, mode: 'sent', message: 'Email sent successfully' };
        }
        catch (error) {
            await this.storage.addEmail({
                from: dto.email,
                to: [contactEmail],
                subject: `[Contact] ${dto.subject}`,
                body: plainBody,
                receivedAt: new Date().toISOString(),
                read: false,
                source: 'contact',
            });
            this.logger.error(`SMTP send failed, saved to inbox: ${error.message}`);
            return {
                success: true,
                mode: 'inbox',
                message: 'SMTP failed — message saved to inbox',
            };
        }
    }
    async receiveInboundEmail(dto) {
        const expected = process.env.HARAKA_INBOUND_SECRET ||
            this.storage.get('settings').harakaInboundSecret ||
            'change-me-inbound-secret';
        if (!dto.secret || dto.secret !== expected) {
            throw new common_1.UnauthorizedException('Invalid inbound secret');
        }
        const saved = await this.storage.addEmail({
            from: dto.from,
            to: dto.to,
            subject: dto.subject,
            body: dto.body,
            receivedAt: dto.receivedAt || new Date().toISOString(),
            read: false,
            source: 'haraka',
        });
        return { success: true, id: saved.id };
    }
    getInbox() {
        return this.storage.get('emails') ?? [];
    }
    async markRead(id, read) {
        return this.storage.markEmailRead(id, read);
    }
    async deleteEmail(id) {
        await this.storage.deleteEmail(id);
        return { success: true };
    }
    async getStatus() {
        const cfg = this.getSmtpConfig();
        const transporter = this.getTransporter();
        let smtpOk = false;
        let smtpMessage = 'SMTP not configured';
        if (transporter) {
            try {
                await transporter.verify();
                smtpOk = true;
                smtpMessage = `Connected to ${cfg.host}:${cfg.port}`;
            }
            catch (error) {
                smtpMessage = error.message;
            }
        }
        return {
            provider: 'haraka',
            smtpHost: cfg.host,
            smtpPort: cfg.port,
            mailDomain: cfg.mailDomain,
            smtpOk,
            smtpMessage,
            inboxCount: this.getInbox().length,
            harakaPorts: { smtp: 2525, submission: 2587 },
        };
    }
    async testConnection() {
        const status = await this.getStatus();
        if (!status.smtpOk) {
            return { success: false, message: status.smtpMessage };
        }
        return { success: true, message: status.smtpMessage };
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof storage_service_1.StorageService !== "undefined" && storage_service_1.StorageService) === "function" ? _a : Object])
], EmailService);


/***/ }),

/***/ "./src/storage/storage.module.ts":
/*!***************************************!*\
  !*** ./src/storage/storage.module.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const storage_service_1 = __webpack_require__(/*! ./storage.service */ "./src/storage/storage.service.ts");
let StorageModule = class StorageModule {
};
exports.StorageModule = StorageModule;
exports.StorageModule = StorageModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [storage_service_1.StorageService],
        exports: [storage_service_1.StorageService],
    })
], StorageModule);


/***/ }),

/***/ "./src/storage/storage.service.ts":
/*!****************************************!*\
  !*** ./src/storage/storage.service.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StorageService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const promises_1 = __webpack_require__(/*! fs/promises */ "fs/promises");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const path_1 = __webpack_require__(/*! path */ "path");
const DEFAULT_CONTENT = {
    posts: [],
    portfolio: [],
    testimonials: [],
    pricing: [],
    faq: [],
    emails: [],
    settings: {
        siteName: 'DattisDev',
        contactEmail: 'info@dattisdev.com',
        contactPhone: '+98 21 1234 5678',
        address: 'تهران، خیابان ولیعصر',
        mailDomain: 'dattisdev.com',
        smtpHost: 'haraka',
        smtpPort: 25,
        smtpUser: '',
        smtpPass: '',
        smtpFrom: 'info@dattisdev.com',
    },
};
let StorageService = class StorageService {
    constructor() {
        this.content = { ...DEFAULT_CONTENT };
        this.dataPath = (0, path_1.join)(process.cwd(), 'data', 'content.json');
    }
    async onModuleInit() {
        await this.load();
    }
    async load() {
        try {
            if (!(0, fs_1.existsSync)(this.dataPath)) {
                await (0, promises_1.mkdir)((0, path_1.join)(process.cwd(), 'data'), { recursive: true });
                await this.save(DEFAULT_CONTENT);
                return;
            }
            const raw = await (0, promises_1.readFile)(this.dataPath, 'utf-8');
            const parsed = JSON.parse(raw);
            this.content = {
                ...DEFAULT_CONTENT,
                ...parsed,
                emails: parsed.emails ?? [],
                settings: { ...DEFAULT_CONTENT.settings, ...(parsed.settings ?? {}) },
            };
        }
        catch {
            this.content = { ...DEFAULT_CONTENT };
        }
    }
    async save(data) {
        await (0, promises_1.mkdir)((0, path_1.join)(process.cwd(), 'data'), { recursive: true });
        await (0, promises_1.writeFile)(this.dataPath, JSON.stringify(data, null, 2), 'utf-8');
        this.content = data;
    }
    getAll() {
        return this.content;
    }
    get(key) {
        return this.content[key];
    }
    async set(key, value) {
        const updated = { ...this.content, [key]: value };
        await this.save(updated);
        return value;
    }
    async updateSettings(settings) {
        const updated = {
            ...this.content,
            settings: { ...this.content.settings, ...settings },
        };
        await this.save(updated);
        return updated.settings;
    }
    async addEmail(email) {
        const entry = {
            ...email,
            id: `mail-${Date.now()}`,
        };
        const updated = {
            ...this.content,
            emails: [entry, ...(this.content.emails ?? [])],
        };
        await this.save(updated);
        return entry;
    }
    async markEmailRead(id, read) {
        const emails = (this.content.emails ?? []).map((item) => item.id === id ? { ...item, read } : item);
        const updated = { ...this.content, emails };
        await this.save(updated);
        return emails.find((item) => item.id === id);
    }
    async deleteEmail(id) {
        const emails = (this.content.emails ?? []).filter((item) => item.id !== id);
        const updated = { ...this.content, emails };
        await this.save(updated);
        return true;
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], StorageService);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3001',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Enterprise API')
        .setDescription('Enterprise Website API Documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 3002;
    await app.listen(port);
    console.log(`🚀 Backend server running on: http://localhost:${port}`);
    console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}
bootstrap();

})();

/******/ })()
;