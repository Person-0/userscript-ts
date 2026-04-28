(function (window) {

    window.console.log('Hello World');

})((typeof unsafeWindow === "undefined" ? () => { return window } : () => { return unsafeWindow })());