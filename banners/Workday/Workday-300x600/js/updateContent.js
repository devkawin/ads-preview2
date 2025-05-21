/*
* For content in your creative that Hoxton can not update by targeting a DOM element
* use this function to manually refresh and have control over the display when working in Hoxton.
*/
Creative.updateContent = function (item) 
{

    //hoxton.setState(item);
    _dynamicData = hoxton.getState();
    updateElements(_dynamicData);
    setDynamicNonDomData(); // update data


    var ifNeedsRebuilt = false; // if we need to rebuild the timeline

    switch(item.name)
    {
        
        case "loopingProps":
            ifNeedsRebuilt = true;
            break;
        case "mainCopy":
            ifNeedsRebuilt = true;
            break;
        default:
            ifNeedsRebuilt = false;
    }


    // If we need to renuild the timeline to refresh the updates in Hoxton
    if(ifNeedsRebuilt === true && hoxton.timeline.time() > 0.1)
    {   
        /* 
        // ORIGINAL SOLUTION
        //console.log("rebuild timeline");
        Creative.tl.clear(); // clear timline
        Creative.init(); // rebuild timeline
        Creative.tl.seek("frame01");
        Creative.tl.play();
        */

        // SELDA'S SOLUTION
        debounceRate = 1000;
        if (hoxton.timer) { clearTimeout(hoxton.timer) }
        hoxton.timer = setTimeout(function () { window.location.reload() }, debounceRate)

    }

}