/**
 * 比特描述符
 */
export class BitDescriptor {
    start: number;
    end: number;
    value: number;
    name: string;
    desc?: string;

    /**
     *
     * @param {number} start 起始位置
     * @param {number} end 结束位置
     * @param {number} value 值
     * @param {string} name 名称
     * @param {string} [desc] 描述
     */
    constructor(start: number, end: number, value: number, name: string, desc?: string) {
        this.start = start;
        this.end = end;
        this.value = value;
        this.name = name;
        if (desc) {
            this.desc = desc;
        }
    }

    /**
     * 克隆
     * @return {BitDescriptor}
     */
    clone() {
        return new BitDescriptor(this.start, this.end, this.value, this.name, this.desc);
    }
}
