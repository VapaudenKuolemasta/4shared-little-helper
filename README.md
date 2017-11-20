# 4shared-little-helper
Add new button to UI in root folder
___
![4sharedbutton](https://user-images.githubusercontent.com/7706408/32138136-9fde3d22-bc36-11e7-8a80-97d1b8de0b1b.png)
___
By pressing, whole album will copy to your account and automaticly rename like

    UserName (UserId RegistrationEmailLocalPart)
    
After that, success or error alert will be shown
___
![4sharedalertok](https://user-images.githubusercontent.com/7706408/32138295-ceb656e6-bc38-11e7-825b-c119484c28cc.png)
___
![4sharedalerterror](https://user-images.githubusercontent.com/7706408/32138294-ce943958-bc38-11e7-8ba0-2b85a3b3da7f.png)
___
## Notice
I cant check folder existence before I add one and try to rename. If folder already exists script will move resently added folder
into account bucket. And you need to clear your bucket manualy. I'll try to fix this in the future.

## Requirements
* Greasemonkey / Tampermonkey (if you're using firefox 57+)
