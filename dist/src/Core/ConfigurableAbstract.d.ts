export default abstract class ConfigurableAbstract {
    configuring(config: any): void;
    abstract getDefaultConfig(): any;
}
