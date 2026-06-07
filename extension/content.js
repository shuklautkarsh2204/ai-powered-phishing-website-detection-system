const DEBUG = false;

if (DEBUG) {
    console.log("Features: ", features);
}

function showBanner(
    message,
    confidence,
    isPhishing
) {

    const oldBanner =
        document.getElementById(
            "ai-phishing-banner"
        );

    if (oldBanner) {
        oldBanner.remove();
    }

    const banner =
        document.createElement(
            "div"
        );

    banner.id =
        "ai-phishing-banner";

    banner.innerHTML = `
        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-bottom:8px;
        ">
            <strong>
                🛡 AI Phishing Detector
            </strong>

            <span id="close-banner"
                style="
                    cursor:pointer;
                    font-size:18px;
                    margin-left:15px;
                ">
                ✕
            </span>
        </div>

        <div>
            ${message}
        </div>

        <div style="
            margin-top:8px;
            font-size:13px;
        ">
            Confidence:
            ${confidence}%
        </div>
    `;

    banner.style.position =
        "fixed";

    banner.style.top =
        "20px";

    banner.style.right =
        "-400px";

    banner.style.width =
        "280px";

    banner.style.padding =
        "15px";

    banner.style.zIndex =
        "999999";

    banner.style.borderRadius =
        "12px";

    banner.style.fontFamily =
        "Arial, sans-serif";

    banner.style.fontSize =
        "14px";

    banner.style.color =
        "white";

    banner.style.boxShadow =
        "0 4px 15px rgba(0,0,0,0.3)";

    banner.style.transition =
        "right 0.5s ease";

    banner.style.backgroundColor =
        isPhishing
            ? "#d9534f"
            : "#28a745";

    document.body.appendChild(
        banner
    );

    setTimeout(() => {

        banner.style.right =
            "20px";

    }, 100);

    banner
        .querySelector(
            "#close-banner"
        )
        .addEventListener(
            "click",
            () => {

                banner.style.right =
                    "-400px";

                setTimeout(
                    () => banner.remove(),
                    500
                );

            }
        );

    setTimeout(() => {

        if (
            document.body.contains(
                banner
            )
        ) {

            banner.style.right =
                "-400px";

            setTimeout(
                () => banner.remove(),
                500
            );
        }

    }, 8000);
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

function sfhFeature() {
    const forms = document.forms;

    if(forms.length === 0){
        return -1;
    }

    for (const form of forms){
        const action = form.getAttribute("action");

        if (!action || action === "#" || action.toLowerCase().startsWith("javascript")){
            return 1;
        }
    }
    return -1;
}

function submittingToEmailFeature() {
    const forms = document.forms;

    for (const form of forms){
        const action = form.getAttribute("action");

        if (action && action.toLowerCase().startsWith("mailto:")){
            return 1;
        }
    }
    return -1;
}

function IframeFeatures(){
    const iframes = document.querySelectorAll("iframe");

    if (iframes.length > 0){
        return 1;
    }
    return -1;
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

function redirectFeature() {
    const redirects = performance.getEntriesByType("navigation")[0];

    if ( redirects && redirects.redirectCount > 0){
        return 1;
    }
    return -1;
}

function rightClickFeature() {
    if (document.oncontextmenu) {
        return 1;
    }
    return -1;
}

function linksPointingFeature() {
    const anchors = document.querySelectorAll("a");

    const internal = [...anchors].filter(a => {
        try {
            return (new URL(a.href).hostname === location.hostname);
        } catch {
            return false;
        }
    }).length;

    if (internal === 0) {
        return 1;
    }
    if (internal <= 2){
        return 0;
    }
    return -1;
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

    features[15] =
        sfhFeature();

    features[16] =
        submittingToEmailFeature();

    features[22] =
        IframeFeatures();
    
    features[18] = 
        redirectFeature();

    features[20] = 
        rightClickFeature();
    
    features[29] = 
        linksPointingFeature();    

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
          Links_in_tags: features[14],
          SFH: features[15],
          Submitting_to_email: features[16],
          Iframe: features[22],
          redirect: features[18],
          right_click: features[20],
          links_pointing: features[29]
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

            showBanner(
                "⚠️ Potentially Malicious Website Detected",
                data.confidence,
                true
            );

        } 
        else {
            showBanner(
                "✅ Website Appears Safe",
                data.confidence,
                false
            );
        }
        

    } catch (err) {

        console.error(err);

        showBanner(
            "❌ Prediction Request Failed",
            0,
            null
        );
    }
}

checkWebsite();