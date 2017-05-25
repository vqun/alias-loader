# alias-loader
A webpack loader used to resolve alias.

Typically when we use less in our project, the less-loader cannot resolve the aliases defined in webpack.config.resolve.alias.

Many times, our less file is imported to other one, and they may be in different contexts. For example:

If we have `/root/styles/variables.less`, and `/root/components/button/button.less`, we need the `variables.less` to be imported to `button.less`

**Without `alias-loader`**, we should import it like this:
```css
  /* in button.less: */
  @import '../../styles/variable.less';
  /* ... other less code */
```
that means we must actually know what the relative between variables.less and button.less, and this is really messy.

But now, with `alias-loader`, things is extremely simple. we just need add `alias-loader` to less file resolve loaders, and define the alias, as:

```javascript
  // in webpack.config.js, with webpack > v2.0.0
  resolve: {
    alias: {
      '@styles': path.join(__dirname, 'styles'),
      // ... and so on
    }
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-laoder', 'alias-loader']
    }]
  }

  // also you can define your own aliases for alias-loader in the option:
  use: ['style-loader', 'css-loader', 'less-laoder', {
    loader: 'alias-loader',
    options: {
      alias: {
        // aliases for alias-loader here
      }
    }
  }]
```
then, just modify our button.less:
```css
  /* in button.less: */
  @import '@styles/variables.less';
  /* ... other less code */
```

Also, you can use `alias-laoder` for any file typ as you want, but I really recomend it just on the case as `.less` files.