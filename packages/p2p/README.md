<h1 align="center">
  deriv-p2p
</h1>

## Requirements

-   node
-   npm

## Editor helpers

-   Prettier setup in your editor https://prettier.io/
-   Stylelint setup in your editor https://stylelint.io/
-   Eslint setup in your editor https://eslint.org/

## 🚀 Quick start

1.  **Install your dependencies:**

    ```sh
    npm ci
    ```

2.  **To build publish file:**

    ```sh
    npm run build
    ```

3.  **Libary usage:**

    ```js
    import P2P from 'deriv-p2p'

    <P2P />
    ```

4. **File Structure**

```
src
    ├── components/
    │   ├── ads/
    │   │   ├── ads.js
    │   │   ├── ads.scss
    │   ├── orders/
    │   │   ├── orders.js
    │   │   ├── orders.scss
    │   ├── ...
    │   └── app.jsx
    ├── utils/
    │   ├── timer.js // TODO
    │   ├── ...
    ├── index.js

index.js // publish file
webpack.config.js
package.json
```