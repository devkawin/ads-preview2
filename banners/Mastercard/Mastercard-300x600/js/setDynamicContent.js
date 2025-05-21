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
    // for shorthand references to state object
    _dynamicData = hoxton.getState();

    _copySpeed = _dynamicData.copySpeed;
    _copyStartX = _dynamicData.copyStartX;
    _copyEndX = _dynamicData.copyEndX;
    _copyEase = _dynamicData.copyEase;
    background.src = _dynamicData.background;

    Creative.setExitURL( _dynamicData.exit_url );
    Creative.startAd();
}