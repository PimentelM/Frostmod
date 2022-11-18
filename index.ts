import "frida-il2cpp-bridge";

let includedMethodWords = [
    "Request",
    "Send"
]


let excludedMethodWords = [
    "ctor",
    "cctor",
    "Update",
    "Draw",
    "Guild",
    "Tournament",
    "ndTime",
    "FindWindow",
    "get_hasCancelUse",
    "get_Inventory",
    "GetCooldown",
    "Cooldown",
    "blueprint",
    "CalcRewardsCount",
    "Active",
    "IsValid",
    "Skill",
    "get_hasEndTime",
    "weapon",
    "attack",
    "damage",
    "OnEnable",
    "Init",
    "CanUserInteractWithInventorySlot",
    // Remove after use
    "Execute", "Filter",
    //
    "get_"
]

let includedClassWords = [
    "Inbox",
    "Stack",
    "Mail",
    "Item",
    "RPC",
    // "Request",
    // "Send",
    // "RPC",
    // "gRPC",
    // "firebase"
]


let excludedClassWords = [
    "Mono",
    "UnityEngine",
    "Unity",
    "ToolTipSimpleViewItem",

]

// Lowercase all word lists
includedMethodWords = includedMethodWords.map(word => word.toLowerCase());
excludedMethodWords = excludedMethodWords.map(word => word.toLowerCase());
includedClassWords = includedClassWords.map(word => word.toLowerCase());
excludedClassWords = excludedClassWords.map(word => word.toLowerCase());



Il2Cpp.perform(() => {
    Il2Cpp.trace()
    .assemblies(Il2Cpp.Domain.assembly("Assembly-CSharp"))
    .filterClasses((klass) => {
        if(includedClassWords.some(word => klass.name.toLowerCase().includes(word))){
            return true;
        }

        if(excludedClassWords.some(word => klass.name.toLowerCase()
            .includes(word))){
            return false;
        }
        return false;

    })
    .filterMethods((method) => {
        if(method.name === "get_hasEndTime") return false;

        if(includedMethodWords.some(word => method.name.toLowerCase()
            .includes(word))){
            return true;
        }

        if(excludedMethodWords.some(word => method.name.toLocaleLowerCase()
            .includes(word))){
            return false;
        }

        return true;
    })
    .and()
    .attach("full")
});
