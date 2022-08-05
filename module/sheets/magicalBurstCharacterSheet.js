export default class magicalBurstCharacterSheet extends ActorSheet
{

    static get defaultOptions()
    {
        return mergeObject(super.defaultOptions, {
            template: `systems/magicalburst/templates/sheets/character-sheet.hbs`,
            classes : ["magicalburst", "sheet", "character"]
        });
    }

    getData()
    {
        const baseData = super.getData();
        let sheetData = {
            owner   : this.actor.isOwner,
            editable: this.isEditable,
            actor   : baseData.actor,
            data    : baseData.actor.data.data,
            items   : baseData.items,
            config  : CONFIG.magicalburst
        };

        return sheetData;
    }
}