/*
* For content in your creative that IC can not update by targeting a DOM element
* use this function to manually refresh and have control over the display when working in Hoxton.
*/
Creative.updateContent = function (item) {
    
    console.log("Creative.updateContent");

    _dynamicData = hoxton.getState();
    updateElements(_dynamicData);
    

    // The below config vars are used within the timeline.
    // To allow their values to take effect when edited in the 
    // IC DCP Editor page, we need to manually clear the existing timeline
    // and rebuild it.

    var _timelineNeedsRebuild = false;

    switch(item.name){
        case "copyEase": 
            _copyEase = _dynamicData.copyEase;
            _timelineNeedsRebuild = true;
            break;
    }

     // If we need to renuild the timeline to refresh the updates in Hoxton
    if(_timelineNeedsRebuild){
        console.log("timeline needs to be reInitialised to take account of new values")

            // ORIGINAL SOLUTION
            Creative.tl.clear(); // clear timline
            Creative.init(); // rebuild timeline
            Creative.tl.seek("reset");
            Creative.tl.play();
            

            // SELDA'S SOLUTION
            /*
            debounceRate = 1000;
            if (hoxton.timer) { clearTimeout(hoxton.timer) }
            hoxton.timer = setTimeout(function () { window.location.reload() }, debounceRate)
            */
        
    }
}
