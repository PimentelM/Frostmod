import "frida-il2cpp-bridge";
import { log } from "./log";

log("Re-loaded")


let includedMethodWords : string[] = [
    // "Request",
    // "Send"
]


let excludedMethodWords : string[] = [
    // "ctor",
    // "cctor",
    // "Update",
    // "Draw",
    // "Guild",
    // "Tournament",
    // "ndTime",
    // "FindWindow",
    // "get_hasCancelUse",
    // "get_Inventory",
    // "GetCooldown",
    // "Cooldown",
    // "blueprint",
    // "CalcRewardsCount",
    // "Active",
    // "IsValid",
    // "Skill",
    // "get_hasEndTime",
    // "weapon",
    // "attack",
    // "damage",
    // "OnEnable",
    // "Init",
    // "CanUserInteractWithInventorySlot",
    // // Remove after use
    // "Execute", 
    // // "Filter",
    // //

    // "get_",
    // "TryGet",

    // //
    // "ReplaceTick",
    // "ReplaceServerTick",
    // "ReplacePosition",
    // "ReplaceServerPosition",
    // "PlayBadgeAnimations",
    // "set_TotalUnreadMessages",


    // "OnNetworkReceive",
    // "Put",
    // "OnNetworkLatencyUpdate",

    "SendInput",
]

let includedClassWords : string[] = [
    // "Inbox",
    // "Stack",
    // "Mail",
    // "Item",
    // "RPC",
    // "GameEntity",
    // "Chat",

    // "Request",
    // "Send",
    // "RPC",
    // "gRPC",
    // "firebase",
    // "LiteNetLib",
    // "UDPClient",

    // "NetDataReader",
    // "NetDataWritter",

    // "NetManager",

    "ArenaClientWorldSender"


]


let excludedClassWords : string[] = [
    // "Mono",
    // "UnityEngine",
    // "Unity",
    // "ToolTipSimpleViewItem",
    // "HUD",


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

        if(excludedClassWords.some(word => klass.name.toLowerCase()
        .includes(word))){
        return false;
    }

        if(includedClassWords.some(word => klass.name.toLowerCase().includes(word))){
            return true;
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
    .attach("detailed")
});
