import {magicalburst}        from "./module/config.js";
import magicalBurstItemSheet from "./module/sheets/magicalBurstItemSheet.js";


Hooks.once("init", function ()
{
    console.log("magicalburst | Initializing Magical Burst 4.0 System");

    CONFIG.magicalburst = magicalburst;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("magicalburst", magicalBurstItemSheet,
                        {makeDefault: true});
});