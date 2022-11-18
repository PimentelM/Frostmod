## Class: StackComponentHelper

-  StackComponentHelper.ReplaceStackIfNeed

Invoked when I ask to split a item

- AccountContext.GetEntityWithPlayerId

Probabbly gets the player entity?


--- 

About clicking on the button:

* If we click on item with stack greater than 20 ( or 50 for runes ), this will be executed after the view updates:

```il2cpp: 0x00ff99a0 ┌─MailContext.CreateEntity
il2cpp: 0x00ff9658 │ ┌─MailContext.GetEntityWithMessageId
il2cpp: 0x00ff9658 │ └─MailContext.GetEntityWithMessageId
il2cpp: 0x00ff9a70 │ ┌─MailEntity.AddMessageId
il2cpp: 0x00ff9a70 │ └─MailEntity.AddMessageId
il2cpp: 0x00ff99a0 └─MailContext.CreateEntity```





---- 

Need:


* Need a way to Intercept a function and be able to:
	- Modify it's return
	- Prevent it's execution
	- Call it multiple times with same arguments? [ Context will change though ]
	- See params and return


Tasks:


Download the il2cpp dumper 
Download the apk and unzip it

Get symbols for both versions of the lib 

Open arm and arm64 on decompiler to see which one generates more readable C code



Dig into the functions we saw earlier.
