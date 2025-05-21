/*
* For content that can't be auto updated by IC
* This only gets called when data edits are made in the IC platform not during runtime.
*/
Creative.updateContent = function ( item ) 
{
    console.log("Creative.updateContent: "+ item.name +" : "+ item.type +" : "+ item.value);

    _dynamicData = hoxton.getState();
    Creative.updateChanges(_dynamicData);
    // TODO - control dynamic content here not targeted by IC
    switch ( item.name ) 
    {
        case "exit_url":
            Creative.setExitURL( item.value );
            break;
    }

    // var debounceRate = 1000;
    // if (hoxton.timer) { clearTimeout(hoxton.timer) }
    // hoxton.timer = setTimeout(function () { window.location.reload() }, debounceRate)
}