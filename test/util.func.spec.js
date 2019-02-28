import { html } from "../src/func";

test('func - html', () => {
    var str = html ``
    expect(str).toEqual('');
});


test('func - html 2', () => {
    var str = html`${'a'}`
    expect(str).toEqual('a');
});

test('func - html short tag ', () => {
    var str = html`<ImageView a='1' /> <ImageView b='2' />`
    expect(str).toEqual(`<ImageView a='1' ></ImageView> <ImageView b='2' ></ImageView>`);
});

test('func - html object import', () => {
    var Obj = {b: 10}
    var str = html`<ImageView a='1' ${Obj} />`
    expect(str).toEqual(`<ImageView a='1' b="10" ></ImageView>`);
})

test('func - html function import', () => {
    var Obj = {b: 10}
    var str = html`<ImageView a='1' ${() => Obj} />`
    expect(str).toEqual(`<ImageView a='1' b="10" ></ImageView>`);
})

