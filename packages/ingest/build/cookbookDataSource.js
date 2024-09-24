"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookbookDataSourceConstructor = void 0;
const sources_1 = require("mongodb-rag-ingest/sources");
const cookbookDataSourceConstructor = async ({ githubRepoName, githubRepoUsername, }) => {
    const repoBaseUrl = `https://github.com/${githubRepoUsername}/${githubRepoName}/`;
    const cookbookConfig = {
        name: "mongo-rag-framework",
        repoUrl: repoBaseUrl,
        repoLoaderOptions: {
            branch: "main",
        },
        filter: (path) => path.startsWith("/ktern-source") && !path.endsWith("README.md"),
        pathToPageUrl(pathInRepo) {
            const baseUrl = repoBaseUrl + "blob/main";
            const path = baseUrl + pathInRepo;
            return path;
        },
        extractTitle: (pageContent) => extractFirstH1(pageContent) ?? undefined,
    };
    return await (0, sources_1.makeMdOnGithubDataSource)(cookbookConfig);
};
exports.cookbookDataSourceConstructor = cookbookDataSourceConstructor;
// Helper function
function extractFirstH1(markdownText) {
    const lines = markdownText.split("\n");
    for (let line of lines) {
        if (line.startsWith("# ")) {
            // Remove '# ' and any leading or trailing whitespace
            return line.substring(2).trim();
        }
    }
    return null;
}
//# sourceMappingURL=cookbookDataSource.js.map