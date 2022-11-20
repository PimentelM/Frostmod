import { log } from "./log";
// import "frida";
import "frida-il2cpp-bridge";

log("Loaded")

Il2Cpp.perform(()=>{

    let patchAddress = 0x15f3104 //0x15f310c;

    log(`Patching ${patchAddress}`)
    
    let base = Module.findBaseAddress("libil2cpp.so");
    
    let patchPtr = base?.add(patchAddress);

    Memory.protect(patchPtr!, 12, "rxw");
    

    patchPtr?.writeByteArray([
        0x1f, 0x20, 0x03, 0xd5,
        0x1f, 0x20, 0x03, 0xd5,
        0x1f, 0x20, 0x03, 0xd5
    ]);


})


