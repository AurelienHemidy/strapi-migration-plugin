interface StrapiApp {
  admin: {
    injectionZones: InjectionZones;
  };
  appPlugins: Record<string, StrapiAppPlugin>;
  configurations: {
    authLogo: string;
    head: { favicon: string };
    locales: string[];
    menuLogo: string;
    notifications: { releases: boolean };
    themes: { light: DefaultTheme; dark: DefaultTheme };
    translations: Record<string, Record<string, string>>;
    tutorials: boolean;
  };
  customBootstrapConfiguration: unknown;
  customConfigurations: {
    auth?: { logo: string };
    head?: { favicon: string };
    locales?: string[];
    menu?: { logo: string };
    notifications?: { releases: boolean };
    theme?: { light: DefaultTheme; dark: DefaultTheme };
    translations?: Record<string, unknown>;
    tutorials?: boolean;
  };
  customFields: CustomFields;
  hooksDict: Record<string, ReturnType<typeof createHook>>;
  library: {
    components: Components;
    fields: Fields;
  };
  menu: MenuItem[];
  middlewares: Middlewares;
  plugins: Record<string, Plugin>;
  reducers: Reducers;
  settings: Record<string, StrapiAppSetting>;
  translations: StrapiApp['configurations']['translations'];

  // Methods
  addComponents: (components: Component | Component[]) => void;
  addCorePluginMenuLink: (link: MenuItem) => void;
  addFields: (fields: Field | Field[]) => void;
  addMenuLink: (link: MenuItem) => void;
  addMiddlewares: (middlewares: Middleware[]) => void;
  addReducers: (reducers: ReducersMapObject) => void;
  addSettingsLink: (
    sectionId: keyof StrapiApp['settings'],
    link: StrapiAppSettingLink
  ) => void;
  addSettingsLinks: (
    sectionId: keyof StrapiApp['settings'],
    links: StrapiAppSettingLink[]
  ) => void;
  bootstrap: () => Promise<void>;
  bootstrapAdmin: () => Promise<void>;
  createCustomConfigurations: () => Promise<void>;
  createHook: (name: string) => void;
  createSettingSection: (
    section: StrapiAppSetting,
    links: StrapiAppSettingLink[]
  ) => void;
  createStore: (preloadedState?: unknown) => unknown;
  getAdminInjectedComponents: (
    moduleName: InjectionZoneModule,
    containerName: InjectionZoneContainer,
    blockName: InjectionZoneBlock
  ) => InjectionZoneComponent[];
  getPlugin: (pluginId: PluginConfig['id']) => Plugin;
  initialize: () => Promise<void>;
  injectContentManagerComponent: <
    TContainerName extends keyof InjectionZones['contentManager']
  >(
    containerName: TContainerName,
    blockName: keyof InjectionZones['contentManager'][TContainerName],
    component: InjectionZoneComponent
  ) => void;
  injectAdminComponent: <TContainerName extends keyof InjectionZones['admin']>(
    containerName: TContainerName,
    blockName: keyof InjectionZones['admin'][TContainerName],
    component: InjectionZoneComponent
  ) => void;
  loadAdminTrads: () => Promise<
    Record<string, Record<string, string>> | undefined
  >;
  loadTrads: () => Promise<void>;
  registerHook: (name: string, fn: Handler) => void;
  registerPlugin: (pluginConf: PluginConfig) => void;
  runHookSeries: (name: string, asynchronous?: boolean) => unknown;
  runHookWaterfall: <T>(
    name: string,
    initialValue: T,
    asynchronous?: boolean,
    store?: unknown
  ) => Promise<T>;
  runHookParallel: (name: string) => unknown;
  render: () => JSX.Element;
}
