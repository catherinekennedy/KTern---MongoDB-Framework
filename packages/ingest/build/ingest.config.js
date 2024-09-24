"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_rag_ingest_1 = require("mongodb-rag-ingest");
const mongodb_rag_core_1 = require("mongodb-rag-core");
const embed_1 = require("mongodb-rag-ingest/embed");
const path_1 = __importDefault(require("path"));
const loadEnvVars_1 = require("./loadEnvVars");
const cookbookDataSource_1 = require("./cookbookDataSource");
// Load project environment variables
const dotenvPath = path_1.default.join(__dirname, "..", "..", "..", ".env"); // .env at project root
const { MONGODB_CONNECTION_URI, MONGODB_DATABASE_NAME, OPENAI_API_KEY, OPENAI_EMBEDDING_MODEL, GITHUB_REPO_NAME, GITHUB_REPO_OWNER, } = (0, loadEnvVars_1.loadEnvVars)(dotenvPath);
exports.default = {
    embedder: async () => {
        // Use dynamic import because `@azure/openai` is a ESM package
        // and this file is a CommonJS module.
        const { OpenAIClient, OpenAIKeyCredential } = await import("@azure/openai");
        return (0, mongodb_rag_core_1.makeOpenAiEmbedder)({
            openAiClient: new OpenAIClient(new OpenAIKeyCredential(OPENAI_API_KEY)),
            deployment: OPENAI_EMBEDDING_MODEL,
            backoffOptions: {
                numOfAttempts: 25,
                startingDelay: 1000,
            },
        });
    },
    embeddedContentStore: () => (0, mongodb_rag_core_1.makeMongoDbEmbeddedContentStore)({
        connectionUri: MONGODB_CONNECTION_URI,
        databaseName: MONGODB_DATABASE_NAME,
    }),
    pageStore: () => (0, mongodb_rag_core_1.makeMongoDbPageStore)({
        connectionUri: MONGODB_CONNECTION_URI,
        databaseName: MONGODB_DATABASE_NAME,
    }),
    ingestMetaStore: () => (0, mongodb_rag_ingest_1.makeIngestMetaStore)({
        connectionUri: MONGODB_CONNECTION_URI,
        databaseName: MONGODB_DATABASE_NAME,
        entryId: "all",
    }),
    chunkOptions: () => ({
        transform: embed_1.standardChunkFrontMatterUpdater,
        maxChunkSize: 1000,
    }),
    // Add data sources here
    dataSources: async () => {
        const cookbookSource = await (0, cookbookDataSource_1.cookbookDataSourceConstructor)({
            githubRepoName: GITHUB_REPO_NAME,
            githubRepoUsername: GITHUB_REPO_OWNER,
        });
        return [cookbookSource];
    },
};
//# sourceMappingURL=ingest.config.js.map