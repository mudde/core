// https://raw.githubusercontent.com/NicolasDeveloper/guid-typescript/master/lib/guid.ts
export class GuidHelper {

    static validator = new RegExp("^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$", "i");
    static EMPTY = "00000000-0000-0000-0000-000000000000";
    private value: string;

    private constructor(guid: string) {
        if (!guid) { throw new TypeError("Invalid argument; `value` has no value."); }

        this.value = GuidHelper.EMPTY;

        if (guid && GuidHelper.isGuid(guid)) {
            this.value = guid;
        }
    }

    static isGuid(guid: any):boolean {
        const value: string = guid.toString();

        return guid && (guid instanceof GuidHelper || GuidHelper.validator.test(value));
    }

    static create(): GuidHelper {
        return new GuidHelper([GuidHelper.gen(2), GuidHelper.gen(1), GuidHelper.gen(1), GuidHelper.gen(1), GuidHelper.gen(3)].join("-"));
    }

    static createEmpty(): GuidHelper {
        return new GuidHelper("emptyGuid");
    }

    static parse(guid: string): GuidHelper {
        return new GuidHelper(guid);
    }

    static raw(): string {
        return [GuidHelper.gen(2), GuidHelper.gen(1), GuidHelper.gen(1), GuidHelper.gen(1), GuidHelper.gen(3)].join("-");
    }

    private static gen(count: number) : string {
        let out: string = "";

        for (let i: number = 0; i < count; i++) {
            out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return out;
    }

    equals(other: GuidHelper): boolean {
        return GuidHelper.isGuid(other) && this.value === other.toString();
    }

    isEmpty(): boolean {
        return this.value === GuidHelper.EMPTY;
    }

    toString(): string {
        return this.value;
    }

    toJSON(): any {
        return {
            value: this.value,
        };
    }

}

