# JavaScript Product Catalogue

[Contentful](https://www.contentful.com) provides a content infrastructure for digital teams to power content in websites, apps, and devices. Unlike a CMS, Contentful was built to integrate with the modern software stack. It offers a central hub for structured content, powerful management and delivery APIs, and a customizable web app that enable developers and content creators to ship digital products faster.

This repository shows how to build a frontend JavaScript based application with Contentful for a Product Catalogue, based on the Contentful starter Product Catalogue example space.

This project uses no specific frameworks and is written in plain JavaScript, making use of browser APIs and HTML/CSS.

The application is split over multiple files which are included via script tags in the `index.html` file. While this approach is taken here for simplicity, **this is not advised for production deployments**. Make sure you always bundle up and minify your JavaScript code.

The only external dependencies are:
* the [Contentful SDK](https://github.com/contentful/contentful.js)
* the [marked](https://github.com/chjj/marked) Markdown library for rendering markdown content
* the [es6-promise](https://github.com/stefanpenner/es6-promise) polyfill for Promises in the browser

## Who is this for?

This application was developed in order to show a very simple way of developing a frontend JavaScript application with Contentful, without the aid of any more complex frameworks or tools.

It's also focused on users who are newer to web development in general. The code is commented and explained, so even if you are not so experienced with webdevelopment you can get an understanding of what's happening in the code.

If you'd like to see more complex examples you can look at the [React discovery app](https://github.com/contentful/discovery-app-react) and more will come in the future.

This code makes some use of Promises, which are also used by the Contentful SDK. If you are new to promises, read [this introduction](http://www.html5rocks.com/en/tutorials/es6/promises/) and [this article](http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html) to learn some more common usage patterns.

## Trying it out

You can try this app at http://contentful.github.io/product-catalogue-js

## Try it on JSFiddle

You can try and play with a subsection of this app at the following fiddle: https://jsfiddle.net/trodrigues/btvhh4ma/

There you can see how to get and display a list of products.

## Running it locally

Because this app makes use of the browser's [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) you can't just open the index.html file locally on a browser.

You'll need an http server in order to run this.

If you have node.js and [npm](http://npmjs.com/) available, you can run `npm install http-server` and then run `http-server`. Now you can open http://localhost:8080 in your browser.

If you are on Mac OSX you can also run `python server.py` in the project directory. Now open http://localhost:8000 in your browser.

If you use any other server and serve this in a subdirectory, make sure to set the appropriate value in the `<base>` tag on `index.html`

For instance, for http://contentful.github.io/product-catalogue-js the tag would look as `<base href='/product-catalogue-js/' />`
