// JS to set banners content to dynamic content loaded from DoubleClick

// create var to provide easy access to dynamic data
var _dynamicData = {};

//console.log("Hoxton ready!");
hoxton.timeline = Creative.tl;

// Define the function that should fire when the Ad Server is ready and assets are preloaded
hoxton.isInitialized = setDynamicContent;

/*
* Function sets any dynamic content
*/
function setDynamicContent()
{
    //console.log("setDynamicContent()");

    // for shorthand references to state object
    _dynamicData = hoxton.getState();

    // set copy content - not needed due to DOM (as long as hoxton.json var names match html element ids)
    /*
    copy_01.innerHTML = _dynamicData.copy_01;
    copy_02.innerHTML = _dynamicData.copy_02;
    cta.innerHTML = _dynamicData.cta;
    */

    Creative.setExitURL( _dynamicData.exit_url );
    Creative.startAd();
}