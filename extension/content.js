const DEBUG = false;

if (DEBUG) {
    console.log("Features: ", features);
}

function havingIPAddress(hostname) {
    return /^\d+\.\d+\.\d+\.\d+$/.test(hostname)
        ? 1
        : -1;
}

function urlLength(url) {

    if (url.length < 54)
        return -1;

    if (url.length <= 75)
        return 0;

    return 1;
}

function shorteningService(hostname) {

    const shorteners = [
        "bit.ly",
        "tinyurl.com",
        "goo.gl",
        "t.co",
        "ow.ly",
        "is.gd",
        "buff.ly"
    ];

    return shorteners.some(
        s => hostname.includes(s)
    ) ? 1 : -1;
}

function atSymbol(url) {
    return url.includes("@")
        ? 1
        : -1;
}

function doubleSlashRedirect(url) {

    const pos = url.indexOf("//", 8);

    return pos !== -1
        ? 1
        : -1;
}

function prefixSuffix(hostname) {
    return hostname.includes("-")
        ? 1
        : -1;
}

function subDomain(hostname) {

    const dots =
        hostname.split(".").length - 1;

    if (dots === 1)
        return -1;

    if (dots === 2)
        return 0;

    return 1;
}

function sslState() {

    return location.protocol === "https:"
        ? 1
        : -1;
}

function faviconFeature() {

    const favicon =
        document.querySelector(
            'link[rel*="icon"]'
        );

    if (!favicon)
        return 0;

    try {

        const faviconUrl =
            new URL(favicon.href);

        return faviconUrl.hostname ===
            location.hostname
            ? -1
            : 1;

    } catch {

        return 0;
    }
}

function portFeature() {

    const port =
        location.port;

    if (
        port === "" ||
        port === "80" ||
        port === "443"
    ) {
        return -1;
    }

    return 1;
}

function httpsToken(hostname) {

    return hostname.includes("https")
        ? 1
        : -1;
}

function requestUrlFeature() {

    const resources = [
        ...document.images,
        ...document.scripts
    ];

    if (resources.length === 0)
        return -1;

    let external = 0;

    resources.forEach(r => {

        try {

            const u =
                new URL(r.src);

            if (
                u.hostname !==
                location.hostname
            ) {
                external++;
            }

        } catch {}
    });

    const ratio =
        external / resources.length;

    if (ratio < 0.22)
        return -1;

    if (ratio <= 0.61)
        return 0;

    return 1;
}

function anchorFeature() {

    const anchors =
        document.querySelectorAll("a");

    if (anchors.length === 0)
        return -1;

    let suspicious = 0;

    anchors.forEach(a => {

        const href =
            a.getAttribute("href");

        if (
            !href ||
            href === "#" ||
            href.startsWith(
                "javascript"
            )
        ) {
            suspicious++;
        }
    });

    const ratio =
        suspicious / anchors.length;

    if (ratio < 0.31)
        return -1;

    if (ratio <= 0.67)
        return 0;

    return 1;
}

function linksInTagsFeature() {

    const tags = [
        ...document.querySelectorAll(
            "link"
        ),
        ...document.querySelectorAll(
            "script"
        )
    ];

    if (tags.length === 0)
        return -1;

    let external = 0;

    tags.forEach(t => {

        const src =
            t.href || t.src;

        if (!src)
            return;

        try {

            const u =
                new URL(src);

            if (
                u.hostname !==
                location.hostname
            ) {
                external++;
            }

        } catch {}
    });

    const ratio =
        external / tags.length;

    if (ratio < 0.17)
        return -1;

    if (ratio <= 0.81)
        return 0;

    return 1;
}

function extractFeatures() {

    const url =
        location.href;

    const hostname =
        location.hostname;

    const features =
        new Array(30).fill(0);

    features[0] =
        havingIPAddress(hostname);

    features[1] =
        urlLength(url);

    features[2] =
        shorteningService(hostname);

    features[3] =
        atSymbol(url);

    features[4] =
        doubleSlashRedirect(url);

    features[5] =
        prefixSuffix(hostname);

    features[6] =
        subDomain(hostname);

    features[7] =
        sslState();

    features[9] =
        faviconFeature();

    features[10] =
        portFeature();

    features[11] =
        httpsToken(hostname);

    features[12] =
        requestUrlFeature();

    features[13] =
        anchorFeature();

    features[14] =
        linksInTagsFeature();

    return features;
}

async function checkWebsite() {

    try {

        const features =
            extractFeatures();

        console.log(
            "Features:",
            features
        );

        console.log({
          having_IP_Address: features[0],
          URL_Length: features[1],
          Shortining_Service: features[2],
          having_At_Symbol: features[3],
          double_slash_redirecting: features[4],
          Prefix_Suffix: features[5],
          having_Sub_Domain: features[6],
          SSLfinal_State: features[7],
          Favicon: features[9],
          port: features[10],
          HTTPS_token: features[11],
          Request_URL: features[12],
          URL_of_Anchor: features[13],
          Links_in_tags: features[14]
        });

        const response =
            await fetch(
                "http://127.0.0.1:8000/predict",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        features
                    })
                }
            );

        const data =
            await response.json();

        console.log(
            "Prediction:",
            data.prediction,
            "Confidence:",
            data.confidence
        );

        if (
            data.prediction === 1
        ) {

            alert(
                "⚠️ Potentially Malicious Website Detected\nConfidence: " + 
                (data.confidence * 100).toFixed(2) + "%"
                
            );

        } 
        else {
            alert(
                "✅ Website Appears Safe\nConfidence: " +
                (data.confidence * 100).toFixed(2) + "%"
            );
        }
        

    } catch (err) {

        console.error(err);

        alert(
            "❌ Prediction Request Failed"
        );
    }
}

checkWebsite();