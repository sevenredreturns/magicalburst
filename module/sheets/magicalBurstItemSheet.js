export default class magicalBurstItemSheet extends ItemSheet
{
    static get defaultOptions()
    {
        return mergeObject(super.defaultOptions, {
            width  : 530,
            height : 340,
            classes: ["magicalburst", "sheet", "item"]
        });
    }

    get template()
    {
        return `systems/magicalburst/templates/sheets/${this.item.data.type}-sheet.html`;
    }

    getData()
    {
        const baseData = super.getData();
        let sheetData = {
            owner   : this.item.isOwner,
            editable: this.isEditable,
            item    : baseData.item,
            data    : baseData.item.data.data,
            config  : CONFIG.magicalburst
        };

        return sheetData;
    }
}