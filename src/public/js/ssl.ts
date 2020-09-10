// Redirect to HTTPS

// We don't care if we're debugging
if (!(location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
    // Taken from StackOverflow: https://stackoverflow.com/a/4723302/4937286
    if (location.protocol !== 'https:') {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }
}