// ==UserScript==
// @id              4shared
// @name            4shared little helper
// @version         2.0
// @description     Add current folder to your account and rename it
// @include         https://*.4shared.com/*
// @grant           GM_xmlhttpRequest
// ==/UserScript==

(function fourshared_extention() {
    var addBtn = document.querySelector('.add2myAccountButton');
    var itemid = addBtn.getAttribute('itemid');
    var bar = document.querySelector('.d1mainButtons.simpleViewMainButtons .centered.clearFix');
    var folderId = document.querySelector('#jsRootFolderIdForCurrentUser').getAttribute('value');

    var headers = {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "x-security": "1110869134",
        "locale": "en",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    };

    var userUrl = document.querySelector('.fileOwner.dark-gray.lucida.f11');
    var userName = userUrl.text.slice(0, -1);
    var accountUrl = /\/u\/(.+)\/(.+)\.html/.exec(userUrl);
    accountUrl = '(' + accountUrl[1] + ' ' + accountUrl[2] + ')';
    var dirName = userName + ' ' + accountUrl;

    var div = document.createElement('div');
    div.setAttribute('itemid', itemid);
    div.className = "add2myAccountButton d1btn floatLeft";
    div.innerHTML = "Add and rename";

    div.onclick = function () {

        div.className = div.className + " loadingSpinnerRight";
        div.onclick = false;

        GM_xmlhttpRequest({
            method: "POST",
            url: 'https://www.4shared.com/web/rest/v1_1/folders/' + itemid + '/copy',
            data: "folderId=" + folderId,
            headers: headers,
            onload: function (data) {
                if (data.status === 200) {
                    var json = JSON.parse(data.response);
                    var newFolderId = json.id;

                    GM_xmlhttpRequest({
                        method: "POST",
                        url: 'https://www.4shared.com/web/accountActions/rename',
                        data: "dirId=" + newFolderId + "&name=" + dirName,
                        headers: headers,
                        onload: function (data) {
                            var json = JSON.parse(data.response);

                            if(json.status === 'ok'){
                                alert('Folder with name "' + dirName + '" was successfully added.');
                            }

                            if(json.status === 'failed'){
                                alert("Error!\n\n" + json.errors);

                                // if already exists
                                if(json.errorsCode === '0201'){
                                    GM_xmlhttpRequest({
                                        method: "POST",
                                        url: 'https://www.4shared.com/web/accountActions/remove',
                                        data: "dirId=" + newFolderId,
                                        headers: headers
                                    });
                                }
                            }
                        }
                    });
                }
            }
        });
    };

    if( document.querySelector("#navigationLinks.disabled") ){
        bar.insertBefore(div, addBtn);
    }
})();