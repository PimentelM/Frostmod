import "frida-il2cpp-bridge";
import { log } from "./log";

let isHookEnabled = true;

let _ = (global as any)


_.__targetMethod = null;
_.__lastArgs = [];
_.__ids = [];


function getMethod(className: string, methodName: string, assemblyName = "Assembly-CSharp") {
    let targetAssembly = Il2Cpp.Domain.assembly(assemblyName).image;

    let targetClass = targetAssembly.classes.find(klass => klass.name === className);

    let targetMethod = targetClass?.methods.find(method => method.name === methodName);

    if(targetMethod === undefined){
        log(`Could not find method ${methodName} in class ${className} at assembly ${assemblyName}`);
    }
    else {
        log(`Found ${className}.${methodName} at ${targetMethod?.virtualAddress.toString()}`)
        log(targetMethod!.toString());
    }

    return targetMethod;
}


Il2Cpp.perform(() => {

    let assemblyName = "Assembly-CSharp";

    let className = "ArenaClientWorldSender";

    let methodName = "SendAction" 

    let targetMethod = getMethod(className, methodName, assemblyName);

    if(!targetMethod) return;

    _.__targetMethod = targetMethod;

    if(isHookEnabled){
        log(`Hooking ${className}.${methodName} at ${targetMethod?.virtualAddress.toString()}`)

    
        targetMethod.implementation = function(...args){

            _.__lastArgs = args;

            _.__ids.push(args[1].toString());

            log(`Calling ${className}.${methodName} with args ${args.toString()}`)

            let result = targetMethod?.invoke(...args);            

            log(`Called ${className}.${methodName}`)

            return result;

        }

    }

})