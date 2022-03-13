function addLoadEvent(func) {
    var oldOnload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldOnload();
            func();
        }
    }
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

function highlightPage() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var headers = document.getElementsByTagName("header");
    if (headers.length == 0) {
        return false;
    }
    var navs = headers[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var links = navs[0].getElementsByTagName("a");
    var linkurl;
    for (var i = 0; i < links.length; i++) {
        linkurl = links[i].getAttribute("href");
        if (window.location.href.indexOf(linkurl) != -1) {
            links[i].className = "here";
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id", linktext);
        }
    }
}

addLoadEvent(highlightPage);

function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;

    var elem = document.getElementById(elementID);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        var dist = Math.ceil((final_x - xpos) / 10);
        xpos = xpos + dist;
    }
    if (xpos > final_x) {
        var dist = Math.ceil((xpos - final_x) / 10);
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        var dist = Math.ceil((final_y - ypos) / 10);
        ypos = ypos + dist;
    }
    if (ypos > final_y) {
        var dist = Math.ceil((ypos - final_y) / 10);
        ypos = ypos - dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    elem.movement = setTimeout(function() {
        moveElement(elementID, final_x, final_y, interval);
    }, interval);
}

function prepareSlideShow() {
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById("intro")) return false;
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");

    var frame = document.createElement("img");
    frame.setAttribute("src", "images/frame.gif");
    frame.setAttribute("alt", "");
    frame.setAttribute("id", "frame");
    slideshow.appendChild(frame);

    var preview = document.createElement("img");
    preview.setAttribute("src", "images/slideshow.gif");
    preview.setAttribute("alt", "a glimpse of what awaits you");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);

    var links = intro.getElementsByTagName("a");
    var destination;
    for (var i = 0; i < links.length; i++) {
        links[i].onmouseover = function() {
            destination = this.getAttribute("href");
            if (destination.indexOf("index.html") != -1) {
                moveElement("preview", 0, 0, 5);
            }

            if (destination.indexOf("about.html") != -1) {
                moveElement("preview", -150, 0, 10);
            }

            if (destination.indexOf("photos.html") != -1) {
                moveElement("preview", -300, 0, 10);
            }

            if (destination.indexOf("live.html") != -1) {
                moveElement("preview", -450, 0, 10);
            }

            if (destination.indexOf("contact.html") != -1) {
                console.log("it is ok!!!");
                moveElement("preview", -600, 0, 10);
            }
        }
    }
}

addLoadEvent(prepareSlideShow)

function showSection(id) {
    var sections = document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].getAttribute("id") != id) {
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

function prepareInternalnav() {
    if (!document.getElementsByTagName || !document.getElementById) return false;
    var articles = document.getElementsByTagName("article");
    if (articles.length === 0) return false;
    var navs = articles[0].getElementsByTagName("nav");
    if (navs.length == 0) return 0;
    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var sectionId = links[i].getAttribute("href").split("#")[1];
        if (!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display = "none";
        links[i].destination = sectionId;
        links[i].onclick = function() {
            showSection(this.destination);
            return false;
        }
    }
}

addLoadEvent(prepareInternalnav);


function showPic(whichpic) {
    if (!document.getElementById || !document.getElementById("placeholder")) {
        return true;
    }

    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);

    if (!document.getElementById("description")) {
        return true;
    }

    var text = "";
    if (whichpic.getAttribute("title")) {
        text = whichpic.getAttribute("title");
    }

    var description = document.getElementById("description");
    if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = description;
    }

    return false;
}

function preparePlaceholder() {
    if (!document.createElement || !document.createTextNode || !document.getElementById || !document.getElementsByTagName) {
        return false;
    }

    if (!document.getElementById("imagegallery")) {
        return false;
    }

    var imagegallery = document.getElementById("imagegallery");

    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.gif");
    placeholder.setAttribute("alt", "my image gallery");

    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var descText = document.createTextNode("Choose an image");
    description.appendChild(descText);

    insertAfter(description, imagegallery);
    insertAfter(placeholder, description);
}

function prepareGallery() {
    if (!document.getElementById || !document.getElementsByTagName || !document.getElementById("imagegallery")) {
        return false;
    }

    var imagegallery = document.getElementById("imagegallery");
    var links = imagegallery.getElementsByTagName("a");

    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            var res = showPic(this);
            console.log(res);
            return res;
        };
    }
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

function stripeTables() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
        var odd = false;
        var rows = tables[i].getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if (odd == true) {
                addClass(rows[j], "odd");
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}

function highlightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function() {
            addClass(this, "highlight");
        }
        rows[i].onmouseout = function() {
            this.className = this.oldClassName;
        }
    }
}


function displayAbbreviations() {
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) {
        return false;
    }

    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length == 0) {
        return false;
    }

    var defs = new Object();
    for (var i = 0; i < abbreviations.length; i++) {
        var currAbr = abbreviations[i];
        if (currAbr.childNodes.length < 1) continue;
        var definition = currAbr.getAttribute("title");
        var key = currAbr.lastChild.nodeValue;
        defs[key] = definition;
    }

    var dlist = document.createElement("dl");
    for (key in defs) {
        var dtitle = document.createElement("dt");
        var dtitleText = document.createTextNode(key);
        dtitle.appendChild(dtitleText);

        var ddesc = document.createElement("dd");
        var ddescText = document.createTextNode(defs[key]);
        ddesc.appendChild(ddescText);

        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }

    if (dlist.childNodes.length < 1) {
        return false;
    }

    var header = document.createElement("h3");
    var headerText = document.createTextNode("Abbreviations");
    header.appendChild(headerText);

    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) {
        return false;
    }
    articles[0].appendChild(header);
    articles[0].appendChild(dlist);
}

addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);

function resetFields(whichfrom) {
    // if (Modernizr.input.placeholder) return;
    for (let i = 0; i < whichfrom.elements.length; i++) {
        var element = whichfrom.elements[i];
        if (element.type == "submit") continue;
        var check = element.placeholder || element.getAttribute("placeholder");
        if (!check) continue;
        element.onfocus = function() {
            var text = this.placeholder || this.getAttribute("placeholder");
            if (this.value == text) {
                this.className = "";
                this.value = "";
            }
        }
        element.onblur = function() {
            if (this.value == "") {
                this.className = "placeholder";
                this.value = this.placeholder || this.getAttribute("placeholder");
            }
        };
        element.onblur();
    }
}

function isFilled(field) {
    if (field.value.replace(' ', '').length == 0) return false;
    var placeholder = field.placeholder || field.getAttribute('placeholder');
    return (field.value != placeholder);
}

function isEmail(field) {
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

function validateForm(whichfrom) {
    for (var i = 0; i < whichform.elements.length; i++) {
        var element = whichform.elements[i];
        console.log(element.name);
        if (element.required == "required") {
            if (!isFilled(element.value)) {
                alert("Please fill in the " + element.name + " field.");
            }
            return false;
        }

        if (element.type == "email") {
            if (!isEmail(element)) {
                alert("The " + element.name + " field must be a valid email address.");
                return false;
            }
        }
    }
    return false;
}


function prepareForms() {
    for (var i = 0; i < document.forms.length; i++) {
        var thisform = document.forms[i];
        resetFields(thisform);
        thisform.onsubmit = function() {
            if (!validateForm(this)) return false;
            var article = document.getElementsByTagName("article");
            if (submitFormWithAjax(this, article)) return false;
            return true;
        }
    }
}

addLoadEvent(prepareForms);

function getHTTPObject(params) {
    return new XMLHttpRequest();
}

function dispalyAjaxloading(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    var content = document.createElement("img");
    content.setAttribute("src", "images/loading.gif");
    content.setAttribute("alt", "Loading...");
    element.appendChild(content);
}

function submitFormWithAjax(whichform, target) {
    var request = getHttpObject();
    if (!request) {
        console.log("Ajax load failed!");
        return false;
    }

    displayAjaxLoading(target);

    var dataParts = [];
    var element;
    for (var i = 0; i < whichform.elements.length; i++) {
        element = whichform.elements[i];
        dataParts[i] = element.name + "=" + encodeURIComponent(element.value);
    }

    var data = dataParts.join("&");
    request.open("POST", whichform.getAttribute("action"), true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                var matches = request.responseText.match(/<article>([\s\S+])<\/article>/);
                if (matches.length > 0) {
                    target.innerHTML = matches[1];
                } else {
                    target.innerHTML = "<p>Oops, there was an error. Sorry. </p>";
                }
            } else {
                target.innerHTML = "<p>" + request.statusText + "</p>";
            }
        }
    };

    request.send(data);
    return true;
}