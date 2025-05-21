// JS to set banners content to dynamic content loaded from DoubleClick

// create var to provide easy access to dynamic data
var _dynamicData = {};
gsap.registerPlugin(SplitText) 

var copySplit01;
/*
* Check Hoxton is ready to prevent race condition errors
*/
if (typeof hoxton != "undefined")
{
    //console.log("Hoxton ready!");
    hoxton.timeline = Creative.tl;

    // Define the function that should fire when the Ad Server is ready and assets are preloaded
    hoxton.isInitialized = checkSetDynamicContent;
}
else
{
    var checkHoxtonExists = setInterval(function() 
    {
        if (typeof hoxton != "undefined")
        {
            //console.log("Hoxton ready! Interval used!");
            clearInterval(checkHoxtonExists);

            hoxton.timeline = Creative.tl;

            // Define the function that should fire when the Ad Server is ready and assets are preloaded
            hoxton.isInitialized = checkSetDynamicContent;
            checkSetDynamicContent();// force call in case we missed call from hoxton.js
        }
    }, 100); // check every 100ms
}


var _setDynamicFired = false;
/*
* Function ensures setDynamicContent() is only called once
*/
function checkSetDynamicContent()
{
    if(_setDynamicFired === false)
    {
        setDynamicContent();
        _setDynamicFired = true;
    }
}


function setDynamicContent()
{
    // console.log("setDynamicContent()");

    // for shorthand references to state object
    _dynamicData = hoxton.getState();

    maincopyColor = _dynamicData.maincopyColor;
    subcopyColor = _dynamicData.subcopyColor;
    ctacopyColor = _dynamicData.ctacopyColor;
    ctaborderColor = _dynamicData.ctaborderColor;

    setDynamicNonDomData();
    
}

function initSplitTexts() {
    try {
        // Ensure copy01 exists in the DOM
        const maincopy = document.getElementById("mainCopy");
        if (!maincopy) {
            console.error("Element #mainCopy not found in the DOM.");
            return;
        }

        // Update the dynamic content if needed
        const updatedMainCopy = _dynamicData?.maincopy || "Default text";
        maincopy.innerHTML = updatedMainCopy;

        // Initialize SplitText
        window.copySplit01 = new SplitText(maincopy, {
            type: "lines",
            linesClass: "mainCopy-lines",
        });

        console.log("SplitText initialized for #mainCopy:", window.copySplit01);
    } catch (error) {
        console.error("Error initializing SplitText for #mainCopy:", error);
    }
}

/*
* Set any dynamic data that Hoxton can not update by targeting a DOM element
*/                               
function setDynamicNonDomData()
{
    // set exit url
    _exitURL = _dynamicData.exit_url;

    // _copySpeed = Number(_dynamicData.copySpeed);
    // _copyBlurSpeed = _copySpeed*.4;
    // _copyEase = _dynamicData.copyEase;
    // _frameWait = _dynamicData.frameWait;
    // _frameWaitImage = Number(_dynamicData.frameWaitImage);

    container.style.display = "block";
    _adWidth = container.offsetWidth;
    _adHeight = container.offsetHeight;
    container.className = "hidden size"+_adWidth+"x"+_adHeight;

    // set looping props
    var arrLooping = _dynamicData.loopingProps.split(",");
    if(arrLooping.length === 3)
    {
        _totalLoops = Number(arrLooping[0].trim());
        _endFrameDelay = Number(arrLooping[1].trim());
        if(arrLooping[2].trim() === "true")
        {
            _useReplayBtn = true;
        }
        else
        {
            _useReplayBtn = false;
        }

        Creative.tl.repeat(_totalLoops);
        Creative.tl.repeatDelay(_endFrameDelay);
    }

    startAd();
}


/*
* function gets the contents of an numeric array
*/
function getNumArrayData(arrTarget, strSource)
{
    var arr = strSource.split(",");

    if(arr.length === arrTarget.length)
    {
        for(var i = 0 ; i < arr.length; i++)
        {
            arr[i] = Number(arr[i].trim());
        }

        arrTarget = arr;
    }

    return arrTarget;
}


/*
* function gets the contents of an boolean array
*/
function getBoolArrayData(arrTarget, strSource)
{
    var arr = strSource.split(",");

    if(arr.length === arrTarget.length)
    {
        for(var i = 0 ; i < arr.length; i++)
        {
            if(arr[i].trim() == "true")
            {
                arr[i] = true;
            }
            else
            {
                arr[i] = false;
            }
        }
        arrTarget = arr;
    }

    return arrTarget;
}

/*
* function checks if number
*/
function isNumeric(n)
{
    return !isNaN(parseFloat(n)) && isFinite(n);
}