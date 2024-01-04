const environmentName = process.env.NODE_ENV;

export const getConfig = (): {
    graphql: string;
} => {
    switch (environmentName) {
        case 'production':
            return {
                graphql: 'https://score.minascan.io',
            };
        case 'development':
            return {
                graphql: 'http://localhost:8080',
            };
        default:
            return {
                graphql: 'https://score.minascan.io',
            };
    }
};
