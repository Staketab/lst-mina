/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    rootDir: './',
    moduleDirectories: ["node_modules", "src", "test"],
    testPathIgnorePatterns: ["dist"],
    extensionsToTreatAsEsm: ['.ts'],
    testTimeout: 30_000,
    setupFilesAfterEnv: ["jest-expect-message"],
    moduleNameMapper: {
        'o1js/dist/(.*)': '<rootDir>/node_modules/o1js/dist/$1',
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    transform: {
        '^.+\\.ts?$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
};
