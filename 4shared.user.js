// ==UserScript==
// @id              4shared
// @name            4shared little helper
// @version         1.0
// @description     Add new button, that can add current foldet to your account and rename it 
// @include         https://*.4shared.com/*
// @grant           GM_xmlhttpRequest
// ==/UserScript==

(function fourshared_extention()
{
    var addBtn = document.querySelector('.add2myAccountButton');
    var itemid = addBtn.getAttribute('itemid');
    var bar = document.querySelector('.d1mainButtons.simpleViewMainButtons .centered.clearFix');
    var folderId = document.querySelector('#jsRootFolderIdForCurrentUser').getAttribute('value');
    var headers = {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "x-security": "1110869134",
        "locale": "ru",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    };

    var userUrl = document.querySelector('.fileOwner.dark-gray.lucida.f11');
    var userName = userUrl.text.slice(0, -1);
    var accountUrl = /\/u\/(.+)\/(.+)\.html/.exec(userUrl);
    var accountUrl = '('+accountUrl[1]+' '+accountUrl[2]+')';

    var div = document.createElement('div');
    div.setAttribute('itemid', itemid);
    div.className = "add2myAccountButton d1btn floatLeft";
    div.innerHTML = "Add and rename";

    div.onclick = function(){

        GM_xmlhttpRequest({
            method : "POST",
            url : 'https://www.4shared.com/web/rest/v1_1/folders/'+itemid+'/copy',
            data : "folderId="+folderId,
            headers: headers,
            onload : function( data ){
                console.info('copy with '+data.status)
                if(data.status == 200){
                    json = JSON.parse(data.response)
                    var newFolderId = json.id;
                    console.info('Rename data = '+"dirId="+newFolderId+"&name="+userName+' '+accountUrl);

                    GM_xmlhttpRequest({
                        method : "POST",
                        url : 'https://www.4shared.com/web/accountActions/rename',
                        data : "dirId="+newFolderId+"&name="+userName+' '+accountUrl,
                        headers: headers,
                        onload : function( data ){
                            console.info('rename with '+data.status)
                            alert('Add and rename.');
                        }
                    });
                }
            },
            onerror : function(data){
                alert('error');
                console.dir(data);
            }
        });
    }

    bar.insertBefore(div, addBtn);
})();