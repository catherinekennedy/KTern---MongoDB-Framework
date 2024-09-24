declare const _default: {
    embedder: () => Promise<import("mongodb-rag-core").Embedder>;
    embeddedContentStore: () => import("mongodb-rag-core").VectorStore<import("mongodb-rag-core").EmbeddedContent> & {
        loadEmbeddedContent(args: {
            page: import("mongodb-rag-core").Page;
        }): Promise<import("mongodb-rag-core").EmbeddedContent[]>;
        deleteEmbeddedContent(args: {
            page: import("mongodb-rag-core").Page;
        }): Promise<void>;
        updateEmbeddedContent(args: {
            page: import("mongodb-rag-core").Page;
            embeddedContent: import("mongodb-rag-core").EmbeddedContent[];
        }): Promise<void>;
        close?: () => Promise<void>;
    } & import("mongodb-rag-core").DatabaseConnection;
    pageStore: () => import("mongodb-rag-core").MongoDbPageStore;
    ingestMetaStore: () => import("mongodb-rag-ingest").IngestMetaStore;
    chunkOptions: () => {
        transform: import("mongodb-rag-ingest/embed").ChunkTransformer;
        maxChunkSize: number;
    };
    dataSources: () => Promise<import("mongodb-rag-ingest/sources").DataSource[]>;
};
export default _default;
//# sourceMappingURL=ingest.config.d.ts.map