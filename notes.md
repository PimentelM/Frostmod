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

--- 


BaseClientWorld is the Command Processor.

--- 

Enviar varias vezes o mesmo ArenaClientWorldSend.SendTakeStoreInbox não funciona pra duplicar items.

Caso vc tenha um stack ele vai só pegar várias vezes daquele mesmo stack.. Então temos q ver se o messageId é alterado quando fazemos o dupe.

-> Resultados:

Após verificar se o messageId era alterado, constatei que ele continuava o mesmo ao usar o auto clicker.

A função foi chamada 8 vezes, e recebemos 8 stacks de 20, no nosso inbox tinha apenas 4 stacks de 20.


Gostaria de entender o que acontece entre o client e o servidor que faz com que ao usar autoclicker o usuário consiga pegar mais items do que deveria, enquanto que ao usar o send command diretamente só é possível conseguir a quantidade de items que tem lá no mail.


Teorias:

-> Talvez se eu enviar um comando a cada frame a coisa mude?

-> Quais outros comandos são enviados para o servidor durante o procedimento do auto click?

-> Será possível "criar" items no client e ter eles legitimizados no servidor?















---- 

Need:


* Need a way to Intercept a function and be able to:
	- Modify it's return
	- Prevent it's execution
	- Call it multiple times with same arguments? [ Context will change though ]
	- See params and return

	^ All OK.
