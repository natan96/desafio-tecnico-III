
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Paciente
 * 
 */
export type Paciente = $Result.DefaultSelection<Prisma.$PacientePayload>
/**
 * Model Exame
 * 
 */
export type Exame = $Result.DefaultSelection<Prisma.$ExamePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Pacientes
 * const pacientes = await prisma.paciente.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Pacientes
   * const pacientes = await prisma.paciente.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.paciente`: Exposes CRUD operations for the **Paciente** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pacientes
    * const pacientes = await prisma.paciente.findMany()
    * ```
    */
  get paciente(): Prisma.PacienteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exame`: Exposes CRUD operations for the **Exame** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Exames
    * const exames = await prisma.exame.findMany()
    * ```
    */
  get exame(): Prisma.ExameDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Paciente: 'Paciente',
    Exame: 'Exame'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "paciente" | "exame"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Paciente: {
        payload: Prisma.$PacientePayload<ExtArgs>
        fields: Prisma.PacienteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PacienteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PacienteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload>
          }
          findFirst: {
            args: Prisma.PacienteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PacienteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload>
          }
          findMany: {
            args: Prisma.PacienteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload>[]
          }
          create: {
            args: Prisma.PacienteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload>
          }
          createMany: {
            args: Prisma.PacienteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PacienteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload>
          }
          update: {
            args: Prisma.PacienteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload>
          }
          deleteMany: {
            args: Prisma.PacienteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PacienteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PacienteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PacientePayload>
          }
          aggregate: {
            args: Prisma.PacienteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaciente>
          }
          groupBy: {
            args: Prisma.PacienteGroupByArgs<ExtArgs>
            result: $Utils.Optional<PacienteGroupByOutputType>[]
          }
          count: {
            args: Prisma.PacienteCountArgs<ExtArgs>
            result: $Utils.Optional<PacienteCountAggregateOutputType> | number
          }
        }
      }
      Exame: {
        payload: Prisma.$ExamePayload<ExtArgs>
        fields: Prisma.ExameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload>
          }
          findFirst: {
            args: Prisma.ExameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload>
          }
          findMany: {
            args: Prisma.ExameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload>[]
          }
          create: {
            args: Prisma.ExameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload>
          }
          createMany: {
            args: Prisma.ExameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ExameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload>
          }
          update: {
            args: Prisma.ExameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload>
          }
          deleteMany: {
            args: Prisma.ExameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamePayload>
          }
          aggregate: {
            args: Prisma.ExameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExame>
          }
          groupBy: {
            args: Prisma.ExameGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExameGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExameCountArgs<ExtArgs>
            result: $Utils.Optional<ExameCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    paciente?: PacienteOmit
    exame?: ExameOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PacienteCountOutputType
   */

  export type PacienteCountOutputType = {
    exames: number
  }

  export type PacienteCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exames?: boolean | PacienteCountOutputTypeCountExamesArgs
  }

  // Custom InputTypes
  /**
   * PacienteCountOutputType without action
   */
  export type PacienteCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PacienteCountOutputType
     */
    select?: PacienteCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PacienteCountOutputType without action
   */
  export type PacienteCountOutputTypeCountExamesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExameWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Paciente
   */

  export type AggregatePaciente = {
    _count: PacienteCountAggregateOutputType | null
    _avg: PacienteAvgAggregateOutputType | null
    _sum: PacienteSumAggregateOutputType | null
    _min: PacienteMinAggregateOutputType | null
    _max: PacienteMaxAggregateOutputType | null
  }

  export type PacienteAvgAggregateOutputType = {
    id: number | null
  }

  export type PacienteSumAggregateOutputType = {
    id: number | null
  }

  export type PacienteMinAggregateOutputType = {
    id: number | null
    dataCriacao: Date | null
    nome: string | null
    documento: string | null
    celular: string | null
    dataNascimento: Date | null
    cep: string | null
    rua: string | null
    numero: string | null
    bairro: string | null
    cidade: string | null
    uf: string | null
    complemento: string | null
  }

  export type PacienteMaxAggregateOutputType = {
    id: number | null
    dataCriacao: Date | null
    nome: string | null
    documento: string | null
    celular: string | null
    dataNascimento: Date | null
    cep: string | null
    rua: string | null
    numero: string | null
    bairro: string | null
    cidade: string | null
    uf: string | null
    complemento: string | null
  }

  export type PacienteCountAggregateOutputType = {
    id: number
    dataCriacao: number
    nome: number
    documento: number
    celular: number
    dataNascimento: number
    cep: number
    rua: number
    numero: number
    bairro: number
    cidade: number
    uf: number
    complemento: number
    _all: number
  }


  export type PacienteAvgAggregateInputType = {
    id?: true
  }

  export type PacienteSumAggregateInputType = {
    id?: true
  }

  export type PacienteMinAggregateInputType = {
    id?: true
    dataCriacao?: true
    nome?: true
    documento?: true
    celular?: true
    dataNascimento?: true
    cep?: true
    rua?: true
    numero?: true
    bairro?: true
    cidade?: true
    uf?: true
    complemento?: true
  }

  export type PacienteMaxAggregateInputType = {
    id?: true
    dataCriacao?: true
    nome?: true
    documento?: true
    celular?: true
    dataNascimento?: true
    cep?: true
    rua?: true
    numero?: true
    bairro?: true
    cidade?: true
    uf?: true
    complemento?: true
  }

  export type PacienteCountAggregateInputType = {
    id?: true
    dataCriacao?: true
    nome?: true
    documento?: true
    celular?: true
    dataNascimento?: true
    cep?: true
    rua?: true
    numero?: true
    bairro?: true
    cidade?: true
    uf?: true
    complemento?: true
    _all?: true
  }

  export type PacienteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Paciente to aggregate.
     */
    where?: PacienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pacientes to fetch.
     */
    orderBy?: PacienteOrderByWithRelationInput | PacienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PacienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pacientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pacientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pacientes
    **/
    _count?: true | PacienteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PacienteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PacienteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PacienteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PacienteMaxAggregateInputType
  }

  export type GetPacienteAggregateType<T extends PacienteAggregateArgs> = {
        [P in keyof T & keyof AggregatePaciente]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaciente[P]>
      : GetScalarType<T[P], AggregatePaciente[P]>
  }




  export type PacienteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PacienteWhereInput
    orderBy?: PacienteOrderByWithAggregationInput | PacienteOrderByWithAggregationInput[]
    by: PacienteScalarFieldEnum[] | PacienteScalarFieldEnum
    having?: PacienteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PacienteCountAggregateInputType | true
    _avg?: PacienteAvgAggregateInputType
    _sum?: PacienteSumAggregateInputType
    _min?: PacienteMinAggregateInputType
    _max?: PacienteMaxAggregateInputType
  }

  export type PacienteGroupByOutputType = {
    id: number
    dataCriacao: Date
    nome: string
    documento: string
    celular: string
    dataNascimento: Date
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    uf: string
    complemento: string | null
    _count: PacienteCountAggregateOutputType | null
    _avg: PacienteAvgAggregateOutputType | null
    _sum: PacienteSumAggregateOutputType | null
    _min: PacienteMinAggregateOutputType | null
    _max: PacienteMaxAggregateOutputType | null
  }

  type GetPacienteGroupByPayload<T extends PacienteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PacienteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PacienteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PacienteGroupByOutputType[P]>
            : GetScalarType<T[P], PacienteGroupByOutputType[P]>
        }
      >
    >


  export type PacienteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dataCriacao?: boolean
    nome?: boolean
    documento?: boolean
    celular?: boolean
    dataNascimento?: boolean
    cep?: boolean
    rua?: boolean
    numero?: boolean
    bairro?: boolean
    cidade?: boolean
    uf?: boolean
    complemento?: boolean
    exames?: boolean | Paciente$examesArgs<ExtArgs>
    _count?: boolean | PacienteCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paciente"]>



  export type PacienteSelectScalar = {
    id?: boolean
    dataCriacao?: boolean
    nome?: boolean
    documento?: boolean
    celular?: boolean
    dataNascimento?: boolean
    cep?: boolean
    rua?: boolean
    numero?: boolean
    bairro?: boolean
    cidade?: boolean
    uf?: boolean
    complemento?: boolean
  }

  export type PacienteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dataCriacao" | "nome" | "documento" | "celular" | "dataNascimento" | "cep" | "rua" | "numero" | "bairro" | "cidade" | "uf" | "complemento", ExtArgs["result"]["paciente"]>
  export type PacienteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exames?: boolean | Paciente$examesArgs<ExtArgs>
    _count?: boolean | PacienteCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PacientePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Paciente"
    objects: {
      exames: Prisma.$ExamePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      dataCriacao: Date
      nome: string
      documento: string
      celular: string
      dataNascimento: Date
      cep: string
      rua: string
      numero: string
      bairro: string
      cidade: string
      uf: string
      complemento: string | null
    }, ExtArgs["result"]["paciente"]>
    composites: {}
  }

  type PacienteGetPayload<S extends boolean | null | undefined | PacienteDefaultArgs> = $Result.GetResult<Prisma.$PacientePayload, S>

  type PacienteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PacienteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PacienteCountAggregateInputType | true
    }

  export interface PacienteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Paciente'], meta: { name: 'Paciente' } }
    /**
     * Find zero or one Paciente that matches the filter.
     * @param {PacienteFindUniqueArgs} args - Arguments to find a Paciente
     * @example
     * // Get one Paciente
     * const paciente = await prisma.paciente.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PacienteFindUniqueArgs>(args: SelectSubset<T, PacienteFindUniqueArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Paciente that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PacienteFindUniqueOrThrowArgs} args - Arguments to find a Paciente
     * @example
     * // Get one Paciente
     * const paciente = await prisma.paciente.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PacienteFindUniqueOrThrowArgs>(args: SelectSubset<T, PacienteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Paciente that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacienteFindFirstArgs} args - Arguments to find a Paciente
     * @example
     * // Get one Paciente
     * const paciente = await prisma.paciente.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PacienteFindFirstArgs>(args?: SelectSubset<T, PacienteFindFirstArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Paciente that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacienteFindFirstOrThrowArgs} args - Arguments to find a Paciente
     * @example
     * // Get one Paciente
     * const paciente = await prisma.paciente.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PacienteFindFirstOrThrowArgs>(args?: SelectSubset<T, PacienteFindFirstOrThrowArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pacientes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacienteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pacientes
     * const pacientes = await prisma.paciente.findMany()
     * 
     * // Get first 10 Pacientes
     * const pacientes = await prisma.paciente.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pacienteWithIdOnly = await prisma.paciente.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PacienteFindManyArgs>(args?: SelectSubset<T, PacienteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Paciente.
     * @param {PacienteCreateArgs} args - Arguments to create a Paciente.
     * @example
     * // Create one Paciente
     * const Paciente = await prisma.paciente.create({
     *   data: {
     *     // ... data to create a Paciente
     *   }
     * })
     * 
     */
    create<T extends PacienteCreateArgs>(args: SelectSubset<T, PacienteCreateArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pacientes.
     * @param {PacienteCreateManyArgs} args - Arguments to create many Pacientes.
     * @example
     * // Create many Pacientes
     * const paciente = await prisma.paciente.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PacienteCreateManyArgs>(args?: SelectSubset<T, PacienteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Paciente.
     * @param {PacienteDeleteArgs} args - Arguments to delete one Paciente.
     * @example
     * // Delete one Paciente
     * const Paciente = await prisma.paciente.delete({
     *   where: {
     *     // ... filter to delete one Paciente
     *   }
     * })
     * 
     */
    delete<T extends PacienteDeleteArgs>(args: SelectSubset<T, PacienteDeleteArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Paciente.
     * @param {PacienteUpdateArgs} args - Arguments to update one Paciente.
     * @example
     * // Update one Paciente
     * const paciente = await prisma.paciente.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PacienteUpdateArgs>(args: SelectSubset<T, PacienteUpdateArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pacientes.
     * @param {PacienteDeleteManyArgs} args - Arguments to filter Pacientes to delete.
     * @example
     * // Delete a few Pacientes
     * const { count } = await prisma.paciente.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PacienteDeleteManyArgs>(args?: SelectSubset<T, PacienteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pacientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacienteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pacientes
     * const paciente = await prisma.paciente.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PacienteUpdateManyArgs>(args: SelectSubset<T, PacienteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Paciente.
     * @param {PacienteUpsertArgs} args - Arguments to update or create a Paciente.
     * @example
     * // Update or create a Paciente
     * const paciente = await prisma.paciente.upsert({
     *   create: {
     *     // ... data to create a Paciente
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Paciente we want to update
     *   }
     * })
     */
    upsert<T extends PacienteUpsertArgs>(args: SelectSubset<T, PacienteUpsertArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pacientes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacienteCountArgs} args - Arguments to filter Pacientes to count.
     * @example
     * // Count the number of Pacientes
     * const count = await prisma.paciente.count({
     *   where: {
     *     // ... the filter for the Pacientes we want to count
     *   }
     * })
    **/
    count<T extends PacienteCountArgs>(
      args?: Subset<T, PacienteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PacienteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Paciente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacienteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PacienteAggregateArgs>(args: Subset<T, PacienteAggregateArgs>): Prisma.PrismaPromise<GetPacienteAggregateType<T>>

    /**
     * Group by Paciente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PacienteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PacienteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PacienteGroupByArgs['orderBy'] }
        : { orderBy?: PacienteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PacienteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPacienteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Paciente model
   */
  readonly fields: PacienteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Paciente.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PacienteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    exames<T extends Paciente$examesArgs<ExtArgs> = {}>(args?: Subset<T, Paciente$examesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Paciente model
   */
  interface PacienteFieldRefs {
    readonly id: FieldRef<"Paciente", 'Int'>
    readonly dataCriacao: FieldRef<"Paciente", 'DateTime'>
    readonly nome: FieldRef<"Paciente", 'String'>
    readonly documento: FieldRef<"Paciente", 'String'>
    readonly celular: FieldRef<"Paciente", 'String'>
    readonly dataNascimento: FieldRef<"Paciente", 'DateTime'>
    readonly cep: FieldRef<"Paciente", 'String'>
    readonly rua: FieldRef<"Paciente", 'String'>
    readonly numero: FieldRef<"Paciente", 'String'>
    readonly bairro: FieldRef<"Paciente", 'String'>
    readonly cidade: FieldRef<"Paciente", 'String'>
    readonly uf: FieldRef<"Paciente", 'String'>
    readonly complemento: FieldRef<"Paciente", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Paciente findUnique
   */
  export type PacienteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * Filter, which Paciente to fetch.
     */
    where: PacienteWhereUniqueInput
  }

  /**
   * Paciente findUniqueOrThrow
   */
  export type PacienteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * Filter, which Paciente to fetch.
     */
    where: PacienteWhereUniqueInput
  }

  /**
   * Paciente findFirst
   */
  export type PacienteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * Filter, which Paciente to fetch.
     */
    where?: PacienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pacientes to fetch.
     */
    orderBy?: PacienteOrderByWithRelationInput | PacienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pacientes.
     */
    cursor?: PacienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pacientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pacientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pacientes.
     */
    distinct?: PacienteScalarFieldEnum | PacienteScalarFieldEnum[]
  }

  /**
   * Paciente findFirstOrThrow
   */
  export type PacienteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * Filter, which Paciente to fetch.
     */
    where?: PacienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pacientes to fetch.
     */
    orderBy?: PacienteOrderByWithRelationInput | PacienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pacientes.
     */
    cursor?: PacienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pacientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pacientes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pacientes.
     */
    distinct?: PacienteScalarFieldEnum | PacienteScalarFieldEnum[]
  }

  /**
   * Paciente findMany
   */
  export type PacienteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * Filter, which Pacientes to fetch.
     */
    where?: PacienteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pacientes to fetch.
     */
    orderBy?: PacienteOrderByWithRelationInput | PacienteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pacientes.
     */
    cursor?: PacienteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pacientes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pacientes.
     */
    skip?: number
    distinct?: PacienteScalarFieldEnum | PacienteScalarFieldEnum[]
  }

  /**
   * Paciente create
   */
  export type PacienteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * The data needed to create a Paciente.
     */
    data: XOR<PacienteCreateInput, PacienteUncheckedCreateInput>
  }

  /**
   * Paciente createMany
   */
  export type PacienteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pacientes.
     */
    data: PacienteCreateManyInput | PacienteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Paciente update
   */
  export type PacienteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * The data needed to update a Paciente.
     */
    data: XOR<PacienteUpdateInput, PacienteUncheckedUpdateInput>
    /**
     * Choose, which Paciente to update.
     */
    where: PacienteWhereUniqueInput
  }

  /**
   * Paciente updateMany
   */
  export type PacienteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pacientes.
     */
    data: XOR<PacienteUpdateManyMutationInput, PacienteUncheckedUpdateManyInput>
    /**
     * Filter which Pacientes to update
     */
    where?: PacienteWhereInput
    /**
     * Limit how many Pacientes to update.
     */
    limit?: number
  }

  /**
   * Paciente upsert
   */
  export type PacienteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * The filter to search for the Paciente to update in case it exists.
     */
    where: PacienteWhereUniqueInput
    /**
     * In case the Paciente found by the `where` argument doesn't exist, create a new Paciente with this data.
     */
    create: XOR<PacienteCreateInput, PacienteUncheckedCreateInput>
    /**
     * In case the Paciente was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PacienteUpdateInput, PacienteUncheckedUpdateInput>
  }

  /**
   * Paciente delete
   */
  export type PacienteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
    /**
     * Filter which Paciente to delete.
     */
    where: PacienteWhereUniqueInput
  }

  /**
   * Paciente deleteMany
   */
  export type PacienteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pacientes to delete
     */
    where?: PacienteWhereInput
    /**
     * Limit how many Pacientes to delete.
     */
    limit?: number
  }

  /**
   * Paciente.exames
   */
  export type Paciente$examesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    where?: ExameWhereInput
    orderBy?: ExameOrderByWithRelationInput | ExameOrderByWithRelationInput[]
    cursor?: ExameWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExameScalarFieldEnum | ExameScalarFieldEnum[]
  }

  /**
   * Paciente without action
   */
  export type PacienteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Paciente
     */
    select?: PacienteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Paciente
     */
    omit?: PacienteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PacienteInclude<ExtArgs> | null
  }


  /**
   * Model Exame
   */

  export type AggregateExame = {
    _count: ExameCountAggregateOutputType | null
    _avg: ExameAvgAggregateOutputType | null
    _sum: ExameSumAggregateOutputType | null
    _min: ExameMinAggregateOutputType | null
    _max: ExameMaxAggregateOutputType | null
  }

  export type ExameAvgAggregateOutputType = {
    id: number | null
    pacienteId: number | null
  }

  export type ExameSumAggregateOutputType = {
    id: number | null
    pacienteId: number | null
  }

  export type ExameMinAggregateOutputType = {
    id: number | null
    dataCriacao: Date | null
    idempotencyKey: string | null
    modalidade: string | null
    dataExame: Date | null
    pacienteId: number | null
  }

  export type ExameMaxAggregateOutputType = {
    id: number | null
    dataCriacao: Date | null
    idempotencyKey: string | null
    modalidade: string | null
    dataExame: Date | null
    pacienteId: number | null
  }

  export type ExameCountAggregateOutputType = {
    id: number
    dataCriacao: number
    idempotencyKey: number
    modalidade: number
    dataExame: number
    pacienteId: number
    _all: number
  }


  export type ExameAvgAggregateInputType = {
    id?: true
    pacienteId?: true
  }

  export type ExameSumAggregateInputType = {
    id?: true
    pacienteId?: true
  }

  export type ExameMinAggregateInputType = {
    id?: true
    dataCriacao?: true
    idempotencyKey?: true
    modalidade?: true
    dataExame?: true
    pacienteId?: true
  }

  export type ExameMaxAggregateInputType = {
    id?: true
    dataCriacao?: true
    idempotencyKey?: true
    modalidade?: true
    dataExame?: true
    pacienteId?: true
  }

  export type ExameCountAggregateInputType = {
    id?: true
    dataCriacao?: true
    idempotencyKey?: true
    modalidade?: true
    dataExame?: true
    pacienteId?: true
    _all?: true
  }

  export type ExameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exame to aggregate.
     */
    where?: ExameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exames to fetch.
     */
    orderBy?: ExameOrderByWithRelationInput | ExameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Exames
    **/
    _count?: true | ExameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExameMaxAggregateInputType
  }

  export type GetExameAggregateType<T extends ExameAggregateArgs> = {
        [P in keyof T & keyof AggregateExame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExame[P]>
      : GetScalarType<T[P], AggregateExame[P]>
  }




  export type ExameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExameWhereInput
    orderBy?: ExameOrderByWithAggregationInput | ExameOrderByWithAggregationInput[]
    by: ExameScalarFieldEnum[] | ExameScalarFieldEnum
    having?: ExameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExameCountAggregateInputType | true
    _avg?: ExameAvgAggregateInputType
    _sum?: ExameSumAggregateInputType
    _min?: ExameMinAggregateInputType
    _max?: ExameMaxAggregateInputType
  }

  export type ExameGroupByOutputType = {
    id: number
    dataCriacao: Date
    idempotencyKey: string
    modalidade: string
    dataExame: Date
    pacienteId: number
    _count: ExameCountAggregateOutputType | null
    _avg: ExameAvgAggregateOutputType | null
    _sum: ExameSumAggregateOutputType | null
    _min: ExameMinAggregateOutputType | null
    _max: ExameMaxAggregateOutputType | null
  }

  type GetExameGroupByPayload<T extends ExameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExameGroupByOutputType[P]>
            : GetScalarType<T[P], ExameGroupByOutputType[P]>
        }
      >
    >


  export type ExameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    dataCriacao?: boolean
    idempotencyKey?: boolean
    modalidade?: boolean
    dataExame?: boolean
    pacienteId?: boolean
    paciente?: boolean | PacienteDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exame"]>



  export type ExameSelectScalar = {
    id?: boolean
    dataCriacao?: boolean
    idempotencyKey?: boolean
    modalidade?: boolean
    dataExame?: boolean
    pacienteId?: boolean
  }

  export type ExameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "dataCriacao" | "idempotencyKey" | "modalidade" | "dataExame" | "pacienteId", ExtArgs["result"]["exame"]>
  export type ExameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paciente?: boolean | PacienteDefaultArgs<ExtArgs>
  }

  export type $ExamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Exame"
    objects: {
      paciente: Prisma.$PacientePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      dataCriacao: Date
      idempotencyKey: string
      modalidade: string
      dataExame: Date
      pacienteId: number
    }, ExtArgs["result"]["exame"]>
    composites: {}
  }

  type ExameGetPayload<S extends boolean | null | undefined | ExameDefaultArgs> = $Result.GetResult<Prisma.$ExamePayload, S>

  type ExameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExameCountAggregateInputType | true
    }

  export interface ExameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Exame'], meta: { name: 'Exame' } }
    /**
     * Find zero or one Exame that matches the filter.
     * @param {ExameFindUniqueArgs} args - Arguments to find a Exame
     * @example
     * // Get one Exame
     * const exame = await prisma.exame.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExameFindUniqueArgs>(args: SelectSubset<T, ExameFindUniqueArgs<ExtArgs>>): Prisma__ExameClient<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Exame that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExameFindUniqueOrThrowArgs} args - Arguments to find a Exame
     * @example
     * // Get one Exame
     * const exame = await prisma.exame.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExameFindUniqueOrThrowArgs>(args: SelectSubset<T, ExameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExameClient<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exame that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExameFindFirstArgs} args - Arguments to find a Exame
     * @example
     * // Get one Exame
     * const exame = await prisma.exame.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExameFindFirstArgs>(args?: SelectSubset<T, ExameFindFirstArgs<ExtArgs>>): Prisma__ExameClient<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exame that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExameFindFirstOrThrowArgs} args - Arguments to find a Exame
     * @example
     * // Get one Exame
     * const exame = await prisma.exame.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExameFindFirstOrThrowArgs>(args?: SelectSubset<T, ExameFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExameClient<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Exames that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exames
     * const exames = await prisma.exame.findMany()
     * 
     * // Get first 10 Exames
     * const exames = await prisma.exame.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exameWithIdOnly = await prisma.exame.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExameFindManyArgs>(args?: SelectSubset<T, ExameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Exame.
     * @param {ExameCreateArgs} args - Arguments to create a Exame.
     * @example
     * // Create one Exame
     * const Exame = await prisma.exame.create({
     *   data: {
     *     // ... data to create a Exame
     *   }
     * })
     * 
     */
    create<T extends ExameCreateArgs>(args: SelectSubset<T, ExameCreateArgs<ExtArgs>>): Prisma__ExameClient<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Exames.
     * @param {ExameCreateManyArgs} args - Arguments to create many Exames.
     * @example
     * // Create many Exames
     * const exame = await prisma.exame.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExameCreateManyArgs>(args?: SelectSubset<T, ExameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Exame.
     * @param {ExameDeleteArgs} args - Arguments to delete one Exame.
     * @example
     * // Delete one Exame
     * const Exame = await prisma.exame.delete({
     *   where: {
     *     // ... filter to delete one Exame
     *   }
     * })
     * 
     */
    delete<T extends ExameDeleteArgs>(args: SelectSubset<T, ExameDeleteArgs<ExtArgs>>): Prisma__ExameClient<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Exame.
     * @param {ExameUpdateArgs} args - Arguments to update one Exame.
     * @example
     * // Update one Exame
     * const exame = await prisma.exame.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExameUpdateArgs>(args: SelectSubset<T, ExameUpdateArgs<ExtArgs>>): Prisma__ExameClient<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Exames.
     * @param {ExameDeleteManyArgs} args - Arguments to filter Exames to delete.
     * @example
     * // Delete a few Exames
     * const { count } = await prisma.exame.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExameDeleteManyArgs>(args?: SelectSubset<T, ExameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exames
     * const exame = await prisma.exame.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExameUpdateManyArgs>(args: SelectSubset<T, ExameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Exame.
     * @param {ExameUpsertArgs} args - Arguments to update or create a Exame.
     * @example
     * // Update or create a Exame
     * const exame = await prisma.exame.upsert({
     *   create: {
     *     // ... data to create a Exame
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Exame we want to update
     *   }
     * })
     */
    upsert<T extends ExameUpsertArgs>(args: SelectSubset<T, ExameUpsertArgs<ExtArgs>>): Prisma__ExameClient<$Result.GetResult<Prisma.$ExamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Exames.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExameCountArgs} args - Arguments to filter Exames to count.
     * @example
     * // Count the number of Exames
     * const count = await prisma.exame.count({
     *   where: {
     *     // ... the filter for the Exames we want to count
     *   }
     * })
    **/
    count<T extends ExameCountArgs>(
      args?: Subset<T, ExameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Exame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExameAggregateArgs>(args: Subset<T, ExameAggregateArgs>): Prisma.PrismaPromise<GetExameAggregateType<T>>

    /**
     * Group by Exame.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExameGroupByArgs['orderBy'] }
        : { orderBy?: ExameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Exame model
   */
  readonly fields: ExameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Exame.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    paciente<T extends PacienteDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PacienteDefaultArgs<ExtArgs>>): Prisma__PacienteClient<$Result.GetResult<Prisma.$PacientePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Exame model
   */
  interface ExameFieldRefs {
    readonly id: FieldRef<"Exame", 'Int'>
    readonly dataCriacao: FieldRef<"Exame", 'DateTime'>
    readonly idempotencyKey: FieldRef<"Exame", 'String'>
    readonly modalidade: FieldRef<"Exame", 'String'>
    readonly dataExame: FieldRef<"Exame", 'DateTime'>
    readonly pacienteId: FieldRef<"Exame", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Exame findUnique
   */
  export type ExameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * Filter, which Exame to fetch.
     */
    where: ExameWhereUniqueInput
  }

  /**
   * Exame findUniqueOrThrow
   */
  export type ExameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * Filter, which Exame to fetch.
     */
    where: ExameWhereUniqueInput
  }

  /**
   * Exame findFirst
   */
  export type ExameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * Filter, which Exame to fetch.
     */
    where?: ExameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exames to fetch.
     */
    orderBy?: ExameOrderByWithRelationInput | ExameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exames.
     */
    cursor?: ExameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exames.
     */
    distinct?: ExameScalarFieldEnum | ExameScalarFieldEnum[]
  }

  /**
   * Exame findFirstOrThrow
   */
  export type ExameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * Filter, which Exame to fetch.
     */
    where?: ExameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exames to fetch.
     */
    orderBy?: ExameOrderByWithRelationInput | ExameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exames.
     */
    cursor?: ExameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exames.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exames.
     */
    distinct?: ExameScalarFieldEnum | ExameScalarFieldEnum[]
  }

  /**
   * Exame findMany
   */
  export type ExameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * Filter, which Exames to fetch.
     */
    where?: ExameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exames to fetch.
     */
    orderBy?: ExameOrderByWithRelationInput | ExameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Exames.
     */
    cursor?: ExameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exames from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exames.
     */
    skip?: number
    distinct?: ExameScalarFieldEnum | ExameScalarFieldEnum[]
  }

  /**
   * Exame create
   */
  export type ExameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * The data needed to create a Exame.
     */
    data: XOR<ExameCreateInput, ExameUncheckedCreateInput>
  }

  /**
   * Exame createMany
   */
  export type ExameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Exames.
     */
    data: ExameCreateManyInput | ExameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Exame update
   */
  export type ExameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * The data needed to update a Exame.
     */
    data: XOR<ExameUpdateInput, ExameUncheckedUpdateInput>
    /**
     * Choose, which Exame to update.
     */
    where: ExameWhereUniqueInput
  }

  /**
   * Exame updateMany
   */
  export type ExameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Exames.
     */
    data: XOR<ExameUpdateManyMutationInput, ExameUncheckedUpdateManyInput>
    /**
     * Filter which Exames to update
     */
    where?: ExameWhereInput
    /**
     * Limit how many Exames to update.
     */
    limit?: number
  }

  /**
   * Exame upsert
   */
  export type ExameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * The filter to search for the Exame to update in case it exists.
     */
    where: ExameWhereUniqueInput
    /**
     * In case the Exame found by the `where` argument doesn't exist, create a new Exame with this data.
     */
    create: XOR<ExameCreateInput, ExameUncheckedCreateInput>
    /**
     * In case the Exame was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExameUpdateInput, ExameUncheckedUpdateInput>
  }

  /**
   * Exame delete
   */
  export type ExameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
    /**
     * Filter which Exame to delete.
     */
    where: ExameWhereUniqueInput
  }

  /**
   * Exame deleteMany
   */
  export type ExameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exames to delete
     */
    where?: ExameWhereInput
    /**
     * Limit how many Exames to delete.
     */
    limit?: number
  }

  /**
   * Exame without action
   */
  export type ExameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exame
     */
    select?: ExameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exame
     */
    omit?: ExameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExameInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PacienteScalarFieldEnum: {
    id: 'id',
    dataCriacao: 'dataCriacao',
    nome: 'nome',
    documento: 'documento',
    celular: 'celular',
    dataNascimento: 'dataNascimento',
    cep: 'cep',
    rua: 'rua',
    numero: 'numero',
    bairro: 'bairro',
    cidade: 'cidade',
    uf: 'uf',
    complemento: 'complemento'
  };

  export type PacienteScalarFieldEnum = (typeof PacienteScalarFieldEnum)[keyof typeof PacienteScalarFieldEnum]


  export const ExameScalarFieldEnum: {
    id: 'id',
    dataCriacao: 'dataCriacao',
    idempotencyKey: 'idempotencyKey',
    modalidade: 'modalidade',
    dataExame: 'dataExame',
    pacienteId: 'pacienteId'
  };

  export type ExameScalarFieldEnum = (typeof ExameScalarFieldEnum)[keyof typeof ExameScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const PacienteOrderByRelevanceFieldEnum: {
    nome: 'nome',
    documento: 'documento',
    celular: 'celular',
    cep: 'cep',
    rua: 'rua',
    numero: 'numero',
    bairro: 'bairro',
    cidade: 'cidade',
    uf: 'uf',
    complemento: 'complemento'
  };

  export type PacienteOrderByRelevanceFieldEnum = (typeof PacienteOrderByRelevanceFieldEnum)[keyof typeof PacienteOrderByRelevanceFieldEnum]


  export const ExameOrderByRelevanceFieldEnum: {
    idempotencyKey: 'idempotencyKey',
    modalidade: 'modalidade'
  };

  export type ExameOrderByRelevanceFieldEnum = (typeof ExameOrderByRelevanceFieldEnum)[keyof typeof ExameOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type PacienteWhereInput = {
    AND?: PacienteWhereInput | PacienteWhereInput[]
    OR?: PacienteWhereInput[]
    NOT?: PacienteWhereInput | PacienteWhereInput[]
    id?: IntFilter<"Paciente"> | number
    dataCriacao?: DateTimeFilter<"Paciente"> | Date | string
    nome?: StringFilter<"Paciente"> | string
    documento?: StringFilter<"Paciente"> | string
    celular?: StringFilter<"Paciente"> | string
    dataNascimento?: DateTimeFilter<"Paciente"> | Date | string
    cep?: StringFilter<"Paciente"> | string
    rua?: StringFilter<"Paciente"> | string
    numero?: StringFilter<"Paciente"> | string
    bairro?: StringFilter<"Paciente"> | string
    cidade?: StringFilter<"Paciente"> | string
    uf?: StringFilter<"Paciente"> | string
    complemento?: StringNullableFilter<"Paciente"> | string | null
    exames?: ExameListRelationFilter
  }

  export type PacienteOrderByWithRelationInput = {
    id?: SortOrder
    dataCriacao?: SortOrder
    nome?: SortOrder
    documento?: SortOrder
    celular?: SortOrder
    dataNascimento?: SortOrder
    cep?: SortOrder
    rua?: SortOrder
    numero?: SortOrder
    bairro?: SortOrder
    cidade?: SortOrder
    uf?: SortOrder
    complemento?: SortOrderInput | SortOrder
    exames?: ExameOrderByRelationAggregateInput
    _relevance?: PacienteOrderByRelevanceInput
  }

  export type PacienteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    documento?: string
    AND?: PacienteWhereInput | PacienteWhereInput[]
    OR?: PacienteWhereInput[]
    NOT?: PacienteWhereInput | PacienteWhereInput[]
    dataCriacao?: DateTimeFilter<"Paciente"> | Date | string
    nome?: StringFilter<"Paciente"> | string
    celular?: StringFilter<"Paciente"> | string
    dataNascimento?: DateTimeFilter<"Paciente"> | Date | string
    cep?: StringFilter<"Paciente"> | string
    rua?: StringFilter<"Paciente"> | string
    numero?: StringFilter<"Paciente"> | string
    bairro?: StringFilter<"Paciente"> | string
    cidade?: StringFilter<"Paciente"> | string
    uf?: StringFilter<"Paciente"> | string
    complemento?: StringNullableFilter<"Paciente"> | string | null
    exames?: ExameListRelationFilter
  }, "id" | "documento">

  export type PacienteOrderByWithAggregationInput = {
    id?: SortOrder
    dataCriacao?: SortOrder
    nome?: SortOrder
    documento?: SortOrder
    celular?: SortOrder
    dataNascimento?: SortOrder
    cep?: SortOrder
    rua?: SortOrder
    numero?: SortOrder
    bairro?: SortOrder
    cidade?: SortOrder
    uf?: SortOrder
    complemento?: SortOrderInput | SortOrder
    _count?: PacienteCountOrderByAggregateInput
    _avg?: PacienteAvgOrderByAggregateInput
    _max?: PacienteMaxOrderByAggregateInput
    _min?: PacienteMinOrderByAggregateInput
    _sum?: PacienteSumOrderByAggregateInput
  }

  export type PacienteScalarWhereWithAggregatesInput = {
    AND?: PacienteScalarWhereWithAggregatesInput | PacienteScalarWhereWithAggregatesInput[]
    OR?: PacienteScalarWhereWithAggregatesInput[]
    NOT?: PacienteScalarWhereWithAggregatesInput | PacienteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Paciente"> | number
    dataCriacao?: DateTimeWithAggregatesFilter<"Paciente"> | Date | string
    nome?: StringWithAggregatesFilter<"Paciente"> | string
    documento?: StringWithAggregatesFilter<"Paciente"> | string
    celular?: StringWithAggregatesFilter<"Paciente"> | string
    dataNascimento?: DateTimeWithAggregatesFilter<"Paciente"> | Date | string
    cep?: StringWithAggregatesFilter<"Paciente"> | string
    rua?: StringWithAggregatesFilter<"Paciente"> | string
    numero?: StringWithAggregatesFilter<"Paciente"> | string
    bairro?: StringWithAggregatesFilter<"Paciente"> | string
    cidade?: StringWithAggregatesFilter<"Paciente"> | string
    uf?: StringWithAggregatesFilter<"Paciente"> | string
    complemento?: StringNullableWithAggregatesFilter<"Paciente"> | string | null
  }

  export type ExameWhereInput = {
    AND?: ExameWhereInput | ExameWhereInput[]
    OR?: ExameWhereInput[]
    NOT?: ExameWhereInput | ExameWhereInput[]
    id?: IntFilter<"Exame"> | number
    dataCriacao?: DateTimeFilter<"Exame"> | Date | string
    idempotencyKey?: StringFilter<"Exame"> | string
    modalidade?: StringFilter<"Exame"> | string
    dataExame?: DateTimeFilter<"Exame"> | Date | string
    pacienteId?: IntFilter<"Exame"> | number
    paciente?: XOR<PacienteScalarRelationFilter, PacienteWhereInput>
  }

  export type ExameOrderByWithRelationInput = {
    id?: SortOrder
    dataCriacao?: SortOrder
    idempotencyKey?: SortOrder
    modalidade?: SortOrder
    dataExame?: SortOrder
    pacienteId?: SortOrder
    paciente?: PacienteOrderByWithRelationInput
    _relevance?: ExameOrderByRelevanceInput
  }

  export type ExameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    idempotencyKey?: string
    AND?: ExameWhereInput | ExameWhereInput[]
    OR?: ExameWhereInput[]
    NOT?: ExameWhereInput | ExameWhereInput[]
    dataCriacao?: DateTimeFilter<"Exame"> | Date | string
    modalidade?: StringFilter<"Exame"> | string
    dataExame?: DateTimeFilter<"Exame"> | Date | string
    pacienteId?: IntFilter<"Exame"> | number
    paciente?: XOR<PacienteScalarRelationFilter, PacienteWhereInput>
  }, "id" | "idempotencyKey">

  export type ExameOrderByWithAggregationInput = {
    id?: SortOrder
    dataCriacao?: SortOrder
    idempotencyKey?: SortOrder
    modalidade?: SortOrder
    dataExame?: SortOrder
    pacienteId?: SortOrder
    _count?: ExameCountOrderByAggregateInput
    _avg?: ExameAvgOrderByAggregateInput
    _max?: ExameMaxOrderByAggregateInput
    _min?: ExameMinOrderByAggregateInput
    _sum?: ExameSumOrderByAggregateInput
  }

  export type ExameScalarWhereWithAggregatesInput = {
    AND?: ExameScalarWhereWithAggregatesInput | ExameScalarWhereWithAggregatesInput[]
    OR?: ExameScalarWhereWithAggregatesInput[]
    NOT?: ExameScalarWhereWithAggregatesInput | ExameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Exame"> | number
    dataCriacao?: DateTimeWithAggregatesFilter<"Exame"> | Date | string
    idempotencyKey?: StringWithAggregatesFilter<"Exame"> | string
    modalidade?: StringWithAggregatesFilter<"Exame"> | string
    dataExame?: DateTimeWithAggregatesFilter<"Exame"> | Date | string
    pacienteId?: IntWithAggregatesFilter<"Exame"> | number
  }

  export type PacienteCreateInput = {
    dataCriacao?: Date | string
    nome: string
    documento: string
    celular: string
    dataNascimento: Date | string
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    uf: string
    complemento?: string | null
    exames?: ExameCreateNestedManyWithoutPacienteInput
  }

  export type PacienteUncheckedCreateInput = {
    id?: number
    dataCriacao?: Date | string
    nome: string
    documento: string
    celular: string
    dataNascimento: Date | string
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    uf: string
    complemento?: string | null
    exames?: ExameUncheckedCreateNestedManyWithoutPacienteInput
  }

  export type PacienteUpdateInput = {
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    nome?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    celular?: StringFieldUpdateOperationsInput | string
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    cep?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    bairro?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    complemento?: NullableStringFieldUpdateOperationsInput | string | null
    exames?: ExameUpdateManyWithoutPacienteNestedInput
  }

  export type PacienteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    nome?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    celular?: StringFieldUpdateOperationsInput | string
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    cep?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    bairro?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    complemento?: NullableStringFieldUpdateOperationsInput | string | null
    exames?: ExameUncheckedUpdateManyWithoutPacienteNestedInput
  }

  export type PacienteCreateManyInput = {
    id?: number
    dataCriacao?: Date | string
    nome: string
    documento: string
    celular: string
    dataNascimento: Date | string
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    uf: string
    complemento?: string | null
  }

  export type PacienteUpdateManyMutationInput = {
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    nome?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    celular?: StringFieldUpdateOperationsInput | string
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    cep?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    bairro?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    complemento?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PacienteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    nome?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    celular?: StringFieldUpdateOperationsInput | string
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    cep?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    bairro?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    complemento?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExameCreateInput = {
    dataCriacao?: Date | string
    idempotencyKey: string
    modalidade: string
    dataExame: Date | string
    paciente: PacienteCreateNestedOneWithoutExamesInput
  }

  export type ExameUncheckedCreateInput = {
    id?: number
    dataCriacao?: Date | string
    idempotencyKey: string
    modalidade: string
    dataExame: Date | string
    pacienteId: number
  }

  export type ExameUpdateInput = {
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    modalidade?: StringFieldUpdateOperationsInput | string
    dataExame?: DateTimeFieldUpdateOperationsInput | Date | string
    paciente?: PacienteUpdateOneRequiredWithoutExamesNestedInput
  }

  export type ExameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    modalidade?: StringFieldUpdateOperationsInput | string
    dataExame?: DateTimeFieldUpdateOperationsInput | Date | string
    pacienteId?: IntFieldUpdateOperationsInput | number
  }

  export type ExameCreateManyInput = {
    id?: number
    dataCriacao?: Date | string
    idempotencyKey: string
    modalidade: string
    dataExame: Date | string
    pacienteId: number
  }

  export type ExameUpdateManyMutationInput = {
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    modalidade?: StringFieldUpdateOperationsInput | string
    dataExame?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    modalidade?: StringFieldUpdateOperationsInput | string
    dataExame?: DateTimeFieldUpdateOperationsInput | Date | string
    pacienteId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ExameListRelationFilter = {
    every?: ExameWhereInput
    some?: ExameWhereInput
    none?: ExameWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ExameOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PacienteOrderByRelevanceInput = {
    fields: PacienteOrderByRelevanceFieldEnum | PacienteOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PacienteCountOrderByAggregateInput = {
    id?: SortOrder
    dataCriacao?: SortOrder
    nome?: SortOrder
    documento?: SortOrder
    celular?: SortOrder
    dataNascimento?: SortOrder
    cep?: SortOrder
    rua?: SortOrder
    numero?: SortOrder
    bairro?: SortOrder
    cidade?: SortOrder
    uf?: SortOrder
    complemento?: SortOrder
  }

  export type PacienteAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PacienteMaxOrderByAggregateInput = {
    id?: SortOrder
    dataCriacao?: SortOrder
    nome?: SortOrder
    documento?: SortOrder
    celular?: SortOrder
    dataNascimento?: SortOrder
    cep?: SortOrder
    rua?: SortOrder
    numero?: SortOrder
    bairro?: SortOrder
    cidade?: SortOrder
    uf?: SortOrder
    complemento?: SortOrder
  }

  export type PacienteMinOrderByAggregateInput = {
    id?: SortOrder
    dataCriacao?: SortOrder
    nome?: SortOrder
    documento?: SortOrder
    celular?: SortOrder
    dataNascimento?: SortOrder
    cep?: SortOrder
    rua?: SortOrder
    numero?: SortOrder
    bairro?: SortOrder
    cidade?: SortOrder
    uf?: SortOrder
    complemento?: SortOrder
  }

  export type PacienteSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type PacienteScalarRelationFilter = {
    is?: PacienteWhereInput
    isNot?: PacienteWhereInput
  }

  export type ExameOrderByRelevanceInput = {
    fields: ExameOrderByRelevanceFieldEnum | ExameOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ExameCountOrderByAggregateInput = {
    id?: SortOrder
    dataCriacao?: SortOrder
    idempotencyKey?: SortOrder
    modalidade?: SortOrder
    dataExame?: SortOrder
    pacienteId?: SortOrder
  }

  export type ExameAvgOrderByAggregateInput = {
    id?: SortOrder
    pacienteId?: SortOrder
  }

  export type ExameMaxOrderByAggregateInput = {
    id?: SortOrder
    dataCriacao?: SortOrder
    idempotencyKey?: SortOrder
    modalidade?: SortOrder
    dataExame?: SortOrder
    pacienteId?: SortOrder
  }

  export type ExameMinOrderByAggregateInput = {
    id?: SortOrder
    dataCriacao?: SortOrder
    idempotencyKey?: SortOrder
    modalidade?: SortOrder
    dataExame?: SortOrder
    pacienteId?: SortOrder
  }

  export type ExameSumOrderByAggregateInput = {
    id?: SortOrder
    pacienteId?: SortOrder
  }

  export type ExameCreateNestedManyWithoutPacienteInput = {
    create?: XOR<ExameCreateWithoutPacienteInput, ExameUncheckedCreateWithoutPacienteInput> | ExameCreateWithoutPacienteInput[] | ExameUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: ExameCreateOrConnectWithoutPacienteInput | ExameCreateOrConnectWithoutPacienteInput[]
    createMany?: ExameCreateManyPacienteInputEnvelope
    connect?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
  }

  export type ExameUncheckedCreateNestedManyWithoutPacienteInput = {
    create?: XOR<ExameCreateWithoutPacienteInput, ExameUncheckedCreateWithoutPacienteInput> | ExameCreateWithoutPacienteInput[] | ExameUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: ExameCreateOrConnectWithoutPacienteInput | ExameCreateOrConnectWithoutPacienteInput[]
    createMany?: ExameCreateManyPacienteInputEnvelope
    connect?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ExameUpdateManyWithoutPacienteNestedInput = {
    create?: XOR<ExameCreateWithoutPacienteInput, ExameUncheckedCreateWithoutPacienteInput> | ExameCreateWithoutPacienteInput[] | ExameUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: ExameCreateOrConnectWithoutPacienteInput | ExameCreateOrConnectWithoutPacienteInput[]
    upsert?: ExameUpsertWithWhereUniqueWithoutPacienteInput | ExameUpsertWithWhereUniqueWithoutPacienteInput[]
    createMany?: ExameCreateManyPacienteInputEnvelope
    set?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
    disconnect?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
    delete?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
    connect?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
    update?: ExameUpdateWithWhereUniqueWithoutPacienteInput | ExameUpdateWithWhereUniqueWithoutPacienteInput[]
    updateMany?: ExameUpdateManyWithWhereWithoutPacienteInput | ExameUpdateManyWithWhereWithoutPacienteInput[]
    deleteMany?: ExameScalarWhereInput | ExameScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ExameUncheckedUpdateManyWithoutPacienteNestedInput = {
    create?: XOR<ExameCreateWithoutPacienteInput, ExameUncheckedCreateWithoutPacienteInput> | ExameCreateWithoutPacienteInput[] | ExameUncheckedCreateWithoutPacienteInput[]
    connectOrCreate?: ExameCreateOrConnectWithoutPacienteInput | ExameCreateOrConnectWithoutPacienteInput[]
    upsert?: ExameUpsertWithWhereUniqueWithoutPacienteInput | ExameUpsertWithWhereUniqueWithoutPacienteInput[]
    createMany?: ExameCreateManyPacienteInputEnvelope
    set?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
    disconnect?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
    delete?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
    connect?: ExameWhereUniqueInput | ExameWhereUniqueInput[]
    update?: ExameUpdateWithWhereUniqueWithoutPacienteInput | ExameUpdateWithWhereUniqueWithoutPacienteInput[]
    updateMany?: ExameUpdateManyWithWhereWithoutPacienteInput | ExameUpdateManyWithWhereWithoutPacienteInput[]
    deleteMany?: ExameScalarWhereInput | ExameScalarWhereInput[]
  }

  export type PacienteCreateNestedOneWithoutExamesInput = {
    create?: XOR<PacienteCreateWithoutExamesInput, PacienteUncheckedCreateWithoutExamesInput>
    connectOrCreate?: PacienteCreateOrConnectWithoutExamesInput
    connect?: PacienteWhereUniqueInput
  }

  export type PacienteUpdateOneRequiredWithoutExamesNestedInput = {
    create?: XOR<PacienteCreateWithoutExamesInput, PacienteUncheckedCreateWithoutExamesInput>
    connectOrCreate?: PacienteCreateOrConnectWithoutExamesInput
    upsert?: PacienteUpsertWithoutExamesInput
    connect?: PacienteWhereUniqueInput
    update?: XOR<XOR<PacienteUpdateToOneWithWhereWithoutExamesInput, PacienteUpdateWithoutExamesInput>, PacienteUncheckedUpdateWithoutExamesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ExameCreateWithoutPacienteInput = {
    dataCriacao?: Date | string
    idempotencyKey: string
    modalidade: string
    dataExame: Date | string
  }

  export type ExameUncheckedCreateWithoutPacienteInput = {
    id?: number
    dataCriacao?: Date | string
    idempotencyKey: string
    modalidade: string
    dataExame: Date | string
  }

  export type ExameCreateOrConnectWithoutPacienteInput = {
    where: ExameWhereUniqueInput
    create: XOR<ExameCreateWithoutPacienteInput, ExameUncheckedCreateWithoutPacienteInput>
  }

  export type ExameCreateManyPacienteInputEnvelope = {
    data: ExameCreateManyPacienteInput | ExameCreateManyPacienteInput[]
    skipDuplicates?: boolean
  }

  export type ExameUpsertWithWhereUniqueWithoutPacienteInput = {
    where: ExameWhereUniqueInput
    update: XOR<ExameUpdateWithoutPacienteInput, ExameUncheckedUpdateWithoutPacienteInput>
    create: XOR<ExameCreateWithoutPacienteInput, ExameUncheckedCreateWithoutPacienteInput>
  }

  export type ExameUpdateWithWhereUniqueWithoutPacienteInput = {
    where: ExameWhereUniqueInput
    data: XOR<ExameUpdateWithoutPacienteInput, ExameUncheckedUpdateWithoutPacienteInput>
  }

  export type ExameUpdateManyWithWhereWithoutPacienteInput = {
    where: ExameScalarWhereInput
    data: XOR<ExameUpdateManyMutationInput, ExameUncheckedUpdateManyWithoutPacienteInput>
  }

  export type ExameScalarWhereInput = {
    AND?: ExameScalarWhereInput | ExameScalarWhereInput[]
    OR?: ExameScalarWhereInput[]
    NOT?: ExameScalarWhereInput | ExameScalarWhereInput[]
    id?: IntFilter<"Exame"> | number
    dataCriacao?: DateTimeFilter<"Exame"> | Date | string
    idempotencyKey?: StringFilter<"Exame"> | string
    modalidade?: StringFilter<"Exame"> | string
    dataExame?: DateTimeFilter<"Exame"> | Date | string
    pacienteId?: IntFilter<"Exame"> | number
  }

  export type PacienteCreateWithoutExamesInput = {
    dataCriacao?: Date | string
    nome: string
    documento: string
    celular: string
    dataNascimento: Date | string
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    uf: string
    complemento?: string | null
  }

  export type PacienteUncheckedCreateWithoutExamesInput = {
    id?: number
    dataCriacao?: Date | string
    nome: string
    documento: string
    celular: string
    dataNascimento: Date | string
    cep: string
    rua: string
    numero: string
    bairro: string
    cidade: string
    uf: string
    complemento?: string | null
  }

  export type PacienteCreateOrConnectWithoutExamesInput = {
    where: PacienteWhereUniqueInput
    create: XOR<PacienteCreateWithoutExamesInput, PacienteUncheckedCreateWithoutExamesInput>
  }

  export type PacienteUpsertWithoutExamesInput = {
    update: XOR<PacienteUpdateWithoutExamesInput, PacienteUncheckedUpdateWithoutExamesInput>
    create: XOR<PacienteCreateWithoutExamesInput, PacienteUncheckedCreateWithoutExamesInput>
    where?: PacienteWhereInput
  }

  export type PacienteUpdateToOneWithWhereWithoutExamesInput = {
    where?: PacienteWhereInput
    data: XOR<PacienteUpdateWithoutExamesInput, PacienteUncheckedUpdateWithoutExamesInput>
  }

  export type PacienteUpdateWithoutExamesInput = {
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    nome?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    celular?: StringFieldUpdateOperationsInput | string
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    cep?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    bairro?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    complemento?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PacienteUncheckedUpdateWithoutExamesInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    nome?: StringFieldUpdateOperationsInput | string
    documento?: StringFieldUpdateOperationsInput | string
    celular?: StringFieldUpdateOperationsInput | string
    dataNascimento?: DateTimeFieldUpdateOperationsInput | Date | string
    cep?: StringFieldUpdateOperationsInput | string
    rua?: StringFieldUpdateOperationsInput | string
    numero?: StringFieldUpdateOperationsInput | string
    bairro?: StringFieldUpdateOperationsInput | string
    cidade?: StringFieldUpdateOperationsInput | string
    uf?: StringFieldUpdateOperationsInput | string
    complemento?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ExameCreateManyPacienteInput = {
    id?: number
    dataCriacao?: Date | string
    idempotencyKey: string
    modalidade: string
    dataExame: Date | string
  }

  export type ExameUpdateWithoutPacienteInput = {
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    modalidade?: StringFieldUpdateOperationsInput | string
    dataExame?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExameUncheckedUpdateWithoutPacienteInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    modalidade?: StringFieldUpdateOperationsInput | string
    dataExame?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExameUncheckedUpdateManyWithoutPacienteInput = {
    id?: IntFieldUpdateOperationsInput | number
    dataCriacao?: DateTimeFieldUpdateOperationsInput | Date | string
    idempotencyKey?: StringFieldUpdateOperationsInput | string
    modalidade?: StringFieldUpdateOperationsInput | string
    dataExame?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}