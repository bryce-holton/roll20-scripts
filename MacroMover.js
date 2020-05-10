on("chat:message", (msg) => {
    if(msg.type === "api" && msg.content.indexOf("!exportMacros") === 0) {
        const existingMacros = findObjs({
            type: "character",
            name: "MrMacro",
        });
        
        if(existingMacros !== undefined) {
            _.each(existingMacros, (mrMacro) => {
                mrMacro.remove();
            });
        }
        
        const mrMacro = createObj("character", {
           name: "MrMacro",
           controlledBy: msg.playerid,
        });
        const macroList = findObjs({ type: "macro" });
        
        _.each(macroList, (macro) => {
            createObj("ability", {
                characterid: mrMacro.get("id"),
                name: macro.get("name"),
                action: macro.get("action"),
                istokenaction: macro.get("istokenaction"),
                description: macro.get("visibleto"),
            });
        });
    }
});

on("chat:message", (msg) => {
    if(msg.type === "api" && msg.content.indexOf("!importMacros") === 0) {
        const mrMacro = _.first(findObjs({
            type: "character",
            name: "MrMacro",
        }));
        
        if(mrMacro === undefined) {
            sendChat("API", "Please import MrMacro");
        } else {
            const abilityList = findObjs({
                type: "ability",
                characterid: mrMacro.get("id"),
            });
            
            _.each(abilityList, (ability) => {
                createObj({
                    name: ability.get("name"),
                    action: ability.get("action"),
                    istokenaction: ability.get("istokenaction"),
                    visibleto: ability.get('description'),
                    playerid: msg.playerid,
                });
            });
            mrMacro.remove();
        }
    }
});
