import { INestMicroservice, ExceptionFilter, PipeTransform } from './index';
import { WebSocketAdapter } from './web-socket-adapter.interface';
import { CanActivate } from './can-activate.interface';
import { NestInterceptor } from './nest-interceptor.interface';
import { INestApplicationContext } from './nest-application-context.interface';
export interface INestApplication extends INestApplicationContext {
    /**
     * Initializes application. It is not necessary to call this method directly.
     *
     * @returns Promise
     */
    init(): Promise<void>;
    /**
     * A wrapper function around native `express.use()` method.
     * Example `app.use(cors())`
     *
     * @returns void
     */
    use(...args: any[]): void;
    /**
     * A wrapper function around native `express.set()` method.
     * Example `app.set('trust proxy', 'loopback')`
     *
     * @returns void
     */
    set(...args: any[]): void;
    /**
     * A wrapper function around native `express.engine()` method.
     * Example `app.engine('mustache', mustacheExpress())`
     *
     * @returns void
     */
    engine(...args: any[]): void;
    /**
     * A wrapper function around native `express.enable()` method.
     * Example `app.enable('x-powered-by')`
     *
     * @returns void
     */
    enable(...args: any[]): void;
    /**
     * Enables CORS (Cross-Origin Resource Sharing)
     *
     * @returns void
     */
    enableCors(): void;
    /**
     * A wrapper function around native `express.disable()` method.
     * Example `app.disable('x-powered-by')`
     *
     * @returns void
     */
    disable(...args: any[]): void;
    /**
     * Starts the application.
     *
     * @param  {number} port
     * @param  {string} hostname
     * @param  {Function} callback Optional callback
     * @returns Promise
     */
    listen(port: number | string, callback?: () => void): Promise<any>;
    listen(port: number | string, hostname: string, callback?: () => void): Promise<any>;
    /**
     * Starts the application and can be awaited.
     *
     * @param  {number} port
     * @param  {string} hostname (optional)
     * @returns Promise
     */
    listenAsync(port: number | string, hostname?: string): Promise<any>;
    /**
     * Setups the prefix for the every HTTP route path
     *
     * @param  {string} prefix The prefix for the every HTTP route path (for example `/v1/api`)
     * @returns void
     */
    setGlobalPrefix(prefix: string): void;
    /**
     * Setup Web Sockets Adapter, which will be used inside Gateways.
     * Use, when you want to override default `socket.io` library.
     *
     * @param  {WebSocketAdapter} adapter
     * @returns void
     */
    useWebSocketAdapter(adapter: WebSocketAdapter): void;
    /**
     * Connects microservice to the NestApplication instance. It transforms application to the hybrid instance.
     *
     * @param  {MicroserviceConfiguration} config Microservice configuration objet
     * @returns INestMicroservice
     */
    connectMicroservice(config: any): INestMicroservice;
    /**
     * Returns array of the connected microservices to the NestApplication.
     *
     * @returns INestMicroservice[]
     */
    getMicroservices(): INestMicroservice[];
    /**
     * Returns underlying, native HTTP server.
     *
     * @returns http.Server
     */
    getHttpServer(): any;
    /**
     * Starts all the connected microservices asynchronously
     *
     * @param  {Function} callback Optional callback function
     * @returns void
     */
    startAllMicroservices(callback?: () => void): void;
    /**
     * Starts all the connected microservices and can be awaited
     *
     * @returns Promise
     */
    startAllMicroservicesAsync(): Promise<void>;
    /**
     * Setups exception filters as a global filters (will be used within every HTTP route handler)
     *
     * @param  {ExceptionFilter[]} ...filters
     */
    useGlobalFilters(...filters: ExceptionFilter[]): any;
    /**
     * Setups pipes as a global pipes (will be used within every HTTP route handler)
     *
     * @param  {PipeTransform[]} ...pipes
     */
    useGlobalPipes(...pipes: PipeTransform<any>[]): any;
    /**
     * Setups interceptors as a global interceptors (will be used within every HTTP route handler)
     *
     * @param  {NestInterceptor[]} ...interceptors
     */
    useGlobalInterceptors(...interceptors: NestInterceptor[]): any;
    /**
     * Setups guards as a global guards (will be used within every HTTP route handler)
     *
     * @param  {CanActivate[]} ...guards
     */
    useGlobalGuards(...guards: CanActivate[]): any;
    /**
     * Terminates the application (both NestApplication, Web Socket Gateways and every connected microservice)
     *
     * @returns void
     */
    close(): void;
}
