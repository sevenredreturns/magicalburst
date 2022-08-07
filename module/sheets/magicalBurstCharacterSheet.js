export default class magicalBurstCharacterSheet extends ActorSheet
{

    static get defaultOptions()
    {
        return mergeObject(super.defaultOptions, {
            template: `systems/magicalburst/templates/sheets/character-sheet.hbs`,
            classes : ["magicalburst", "sheet", "character"]
        });
    }

    itemContextMenu = [
        {
            name: 'Edit Item',
            icon: '<i class="fas fa-edit"></i>',
            callback: element => {
                const item=this.actor.items.get(element.data("item-id"));
                console.log(item);
                item.sheet.render(true);
            }
        },
        {
            name: "Delete Item",
            icon: '<i class="fas fa-trash"></i>',
            callback: element => {
                this.actor.deleteEmbeddedDocuments("Item", [element.data("item-id")]);
            }

        }
    ]
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

        sheetData.talents = baseData.items.filter(function (item)
                                                  {
                                                      return item.type ==
                                                          "talent";
                                                  });
        sheetData.relationships = baseData.items.filter(function (item)
                                                  {
                                                      return item.type ==
                                                          "relationship";
                                                  });

        for (let talent of sheetData.talents)
        {
            talent.data.description =
                TextEditor.enrichHTML(talent.data.description);
        }

        return sheetData;
    }

    activateListeners(html)
    {
        html.find(".item-create").click(this._onItemCreate.bind(this));
        html.find(".item-edit").click(this._onItemEdit.bind(this));
        html.find(".item-delete").click(this._onItemDelete.bind(this));
        html.find(".inline-edit").change(this._onRelationshipEdit.bind(this));

        html.find('.overcharge-point')
            .click(this._onOverchargeClick.bind(this));

        new ContextMenu(html, ".talent-card", this.itemContextMenu);
        new ContextMenu(html, ".relationship-item", this.itemContextMenu);

        super.activateListeners(html);
    }

    _onItemCreate(event)
    {
        event.preventDefault();
        let element = event.currentTarget;

        let itemData = {
            name: "Add Item",
            type: element.dataset.type
        };

        return this.actor.createEmbeddedDocuments("Item", [itemData]);
    }

    _onItemEdit(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);

        item.sheet.render(true);
    }

    _onItemDelete(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        console.log(itemId);
        return this.actor.deleteEmbeddedDocuments("Item", [itemId]);
    }


    _onOverchargeClick(event) {
        event.preventDefault();
        let index = event.currentTarget.dataset.index;

        if (event.currentTarget.dataset.name == "attack"){

            let currentOvercharge = this.actor.data.data.attackOvercharge.value;

            if (index == currentOvercharge) {
                index = 0;
            }

            this.actor.update({ "data.attackOvercharge.value" : parseInt(index, 10) });
        }
        else if (event.currentTarget.dataset.name == "defense") {
            let currentOvercharge = this.actor.data.data.defenseOvercharge.value;

            if (index == currentOvercharge) {
                index = 0;
            }

            this.actor.update({ "data.defenseOvercharge.value" : parseInt(index, 10) });
        }
        else if (event.currentTarget.dataset.name == "support"){

            let currentOvercharge = this.actor.data.data.supportOvercharge.value;
            console.log(currentOvercharge);

            if (index == currentOvercharge) {
                index = 0;
            }

            this.actor.update({ "data.supportOvercharge.value" : parseInt(index, 10) });
        }
    }

    _onRelationshipEdit(event) {
        event.preventDefault();
        let element = event.currentTarget;
        let itemId = element.closest(".item").dataset.itemId;
        let item = this.actor.items.get(itemId);
        let field = element.dataset.field;

        return item.update({ [field]: element.value });
    }

}