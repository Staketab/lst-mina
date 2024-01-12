export type Config = {
    deployAliases: Record<
      string,
      {
        url: string;
        keyPath: string;
        fee: string;
        feepayerKeyPath: string;
        feepayerAlias: string;
      }
    >;
  };