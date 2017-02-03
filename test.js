const babel = require('babel-core');
const assert = require('assert');
const reactCreateElementPlugin = require('./index').default;

let transform;

describe('babel-plugin-react-create-element', () => {
  beforeEach(() => {
    transform = code =>
      babel.transform(code, {
        plugins: [reactCreateElementPlugin]
      }).code;
  });

  it('add import statement if `t()` is present', () => {
    const transformed = transform(
      `const SomeComponent = t('div', null, 'hello world');
export default SomeComponent;`
    );

    assert.equal(
      transformed,
      `import { createElement as t } from 'react';
const SomeComponent = t('div', null, 'hello world');
export default SomeComponent;`
    );
  });

  it('do not add when no t in use', () => {
    const transformed = transform('const some = code();');

    assert.equal(transformed, `const some = code();`);
  });

  it('do not import react twice', () => {
    const transformed = transform(
      `const SomeComponent = t('div', null, 'hello world');
const SomeOtherComponent = t('div', null, 'hello world other');
export default { SomeComponent, SomeOtherComponent };`
    );

    assert.equal(
      transformed,
      `import { createElement as t } from 'react';
const SomeComponent = t('div', null, 'hello world');
const SomeOtherComponent = t('div', null, 'hello world other');
export default { SomeComponent, SomeOtherComponent };`
    );
  });

  it('do not add if it already imported', () => {
    const transformed = transform(
      `import React from 'react';
const t = React.createElement;
const SomeComponent = t('div', null, 'hello world');
export default SomeComponent;`
    );

    assert.equal(
      transformed,
      `import React from 'react';
const t = React.createElement;
const SomeComponent = t('div', null, 'hello world');
export default SomeComponent;`
    );
  });
});
