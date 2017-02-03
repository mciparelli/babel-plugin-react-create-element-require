### babel-plugin-react-create-element-require

[![Build
Status](https://api.travis-ci.org/mciparelli/babel-plugin-react-create-element-require.svg?branch=master)](https://travis-ci.org/mciparelli/babel-plugin-react-create-element-require)
[![npm](https://img.shields.io/npm/v/babel-plugin-react-create-element-require.svg?maxAge=3600)](https://www.npmjs.com/package/babel-plugin-react-create-element-require)

&nbsp;

Babel plugin that adds react's createElement import declaration aliased as `t` out of convention.

\_(this repo was cloned from [styled-components-require](https://github.com/mciparelli/babel-plugin-styled-components-require)
and modified to match needs.

&nbsp;

#### Example

Your `component.js` that contains this code:

```js
const Component = t('div', null, 'hello world');
export default Component;
```

will be transpiled to:

```js
import { createElement as t } from 'react';

const Component = t('div', null, 'hello world');
export default Component;
```

&nbsp;

#### Usage

`npm install babel-plugin-react-create-element-require --save-dev`

Add `react-create-element-require` into `.babelrc`

```json
{
  "plugins": ["react-create-element-require"]
}
```

&nbsp;

#### You like?

:star: this repo

&nbsp;

#### License

MIT © [mciparelli](https://github.com/mciparelli)
