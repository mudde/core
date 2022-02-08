/**
 * GuidHelper
 *
 * @source        https://raw.githubusercontent.com/NicolasDeveloper/guid-typescript/master/lib/guid.ts
 */
export declare class GuidHelper {
    static validator: RegExp;
    static EMPTY: string;
    private value;
    private constructor();
    static isGuid(guid: any): boolean;
    static create(): GuidHelper;
    static createEmpty(): GuidHelper;
    static parse(guid: string): GuidHelper;
    static raw(): string;
    private static gen;
    equals(other: GuidHelper): boolean;
    isEmpty(): boolean;
    toString(): string;
    toJSON(): any;
}
