import {BitDescriptor} from "./BitDescriptor";

/**
 * 比特数字
 */
export class BitNumber {

    private readonly max: number;

    private readonly descriptors: BitDescriptor[];

    /**
     *
     * @param {number} bits 比特位数
     * @param {BitDescriptor[]} descriptors 比特描述符
     * @param {number} value 值
     */
    constructor(bits: number, descriptors: BitDescriptor[], value?: number) {
        if (bits > 53) { throw new Error('比特位数不能大于53'); }
        this.max = 2 ** bits - 1;
        this.descriptors = [];
        if (descriptors) {
            descriptors.forEach((descriptor => {
                let d = descriptor.clone();
                let max = 2 ** (d.end - d.start + 1) - 1
                if (d.value > max) {
                    throw new Error(`${d.name}值不能大于${max}`);
                }
                this.descriptors.push(d);
            }));
        }

        if(value !== undefined) {
            this.value = value;
        }
    }

    /**
     * 获取指定名称值
     * @param {string} name 名称
     * @return {number|undefined}
     */
    get(name: string) {
        for(let descriptor of this.descriptors) {
            if (descriptor.name === name) return descriptor.value;
        }
        return undefined;
    }

    /**
     * 设置指定名称值
     * @param {string} name
     * @param {number} value
     * @return {boolean}
     */
    set(name: string, value: number) {
        for(let descriptor of this.descriptors) {
            if (descriptor.name === name) {
                let max = 2 ** (descriptor.end - descriptor.start + 1) - 1;
                if (value > max) {
                    throw new Error(`${descriptor.name}值不能大于${max}`);
                }
                descriptor.value = value;
                return true;
            }
        }
        return false;
    }

    /**
     * 获取值
     * @return {number}
     */
    get value() {
        let v = 0;
        for(let descriptor of this.descriptors) {
            v += descriptor.value * (2 ** descriptor.start);
        }
        return v;
    }

    /**
     * 设置值
     * @param {number} val
     */
    set value(val) {
        for(let descriptor of this.descriptors) {
            descriptor.value = (this.max & (val >> descriptor.start)) % (2 ** (descriptor.end - descriptor.start + 1));
        }
    }


    /**
     * 克隆描述符
     * @return {BitDescriptor[]}
     */
    cloneDescriptors() {
        let result = [];
        for(let descriptor of this.descriptors) {
            let d = descriptor.clone();
            d.value = 0;
            result.push(d);
        }
        return result;
    }
}
