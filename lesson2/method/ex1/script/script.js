function typeVarTest(typeofArg) {
    console.log("typeofArg " + typeofArg + " is " + typeof typeofArg);
}

typeVarTest (undefined);
typeVarTest (0);
typeVarTest (true);
typeVarTest ("foo");
typeVarTest ({});
typeVarTest (null);
typeVarTest (function(){});