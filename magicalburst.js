import {magicalburst}             from "./module/config.js";
import magicalBurstItemSheet
                                  from "./module/sheets/magicalBurstItemSheet.js";
import magicalBurstCharacterSheet
                                  from "./module/sheets/magicalBurstCharacterSheet.js";

async function preloadHandlebarsTemplates()
{
    const templatePaths = ["systems/magicalburst/templates/partials/character-stat-block.hbs"];

    return loadTemplates(templatePaths);
};

Hooks.once("init", function ()
{
    console.log("magicalburst | Initializing Magical Burst 4.0 System");

    CONFIG.magicalburst = magicalburst;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("magicalburst", magicalBurstItemSheet,
                        {makeDefault: true});

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("magicalburst", magicalBurstCharacterSheet,
                         {types: ["magical", "youma"], makeDefault: true});

    preloadHandlebarsTemplates();
});