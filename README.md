#bitnumber

```javascript

const {BitNumber, BitDescriptor} = require('@miaozo/bitnumber')

let a = new BitNumber(16, [
    new BitDescriptor(0, 0, 1, 'a1'),
    new BitDescriptor(1, 2, 2, 'a2'),
    new BitDescriptor(3, 3, 1, 'a3'),
    new BitDescriptor(8, 15, 89, 'a4'),
]);

console.assert(a.value.toString(2) === '101100100001101', 'abc');

let b = new BitNumber(16, a.cloneDescriptors(), 1);

console.assert(a.value === b.value, 'abc');
console.assert(a.get('a1') === b.get('a1'), JSON.stringify([a.get('a1'), b.get('a1')]));
console.assert(a.get('a2') === b.get('a2'), JSON.stringify([a.get('a2'), b.get('a2')]));
console.assert(a.get('a3') === b.get('a3'), JSON.stringify([a.get('a3'), b.get('a3')]));
console.assert(a.get('a4') === b.get('a4'), JSON.stringify([a.get('a4'), b.get('a4')]));

```
