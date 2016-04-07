# JavaScript Product Catalogue

This repository shows how to build a Product Catalogue with JavaScript on a website, based on the Contentful starter Product Catalogue example space.

This project uses no specific frameworks and is written in plain JavaScript, making use of browser APIs and HTML/CSS.

The application is split over multiple files which are included via script tags in the `index.html` file. While this approach is taken here for simplicity, **this is not advised for production deployments**. Make sure you always bundle up and minify your JavaScript code.

The only external dependencies are the [Contentful SDK](https://github.com/contentful/contentful.js) and the [marked](https://github.com/chjj/marked) Markdown library for rendering markdown content.

Feel free to look at the code and understand how to use Contentful on a bare bones, web based, JavaScript enabled website.

## Trying it out

You can try this app at http://contentful.github.io/product-catalogue-js

## Running it locally

Because this app makes use of the browser's [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) you can't just open the index.html file locally on a browser.

You'll need an http server in order to run this.

If you have node.js and [npm](http://npmjs.com/) available, you can run `npm install http-server` and then run `http-server`. Now you can open http://localhost:8080 in your browser.

If you are on Mac OSX you can also run `python -m SimpleHTTPServer` in the project directory. Now open http://localhost:8000 in your browser.

If you use any other server and serve this in a subdirectory, make sure to set the appropriate value in the `<base>` tag on `index.html`

For instance, for http://contentful.github.io/product-catalogue-js the tag would look as `<base href='/product-catalogue-js/' />`
