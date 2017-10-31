/* SystemJS module definition */
declare let module: NodeModule;

interface NodeModule {
  id: string;
}

interface WordpressOptions {
  OAuth2ClientName: string;
  endpoint: string;
}

interface Environment {
  production: boolean;
  wordpress: WordpressOptions;
}
