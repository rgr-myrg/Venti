# TinyEvent
TinyEvent is a minimalist Event/Listener Pattern to facilitate event messaging across mutually exclusive or related components. 

TinyEvent objects have two possible outcomes: 

* onSuccess
* onError

### Code Sample
Create a TinyEvent object:
```java
var event = new UsrLib.TinyEvent();
```

Add a Listener:
```java
event.addListener({
		onSuccess: function(data) {
			console.log("Message: " + data);
		}
});
```

Trigger a successful event:
```java
event.notifySuccess("Sending a Test!");
```

Console Output:
```java
> Message: Sending a Test!
```

### Tech
TinyEvent retains the scope of the listener object by applying it to the function along with data propagated with the event transaction.

This is a powerful feature as it enables listener callbacks to execute within the scope of the listener to trigger state changes and transmit data in an Object-oriented pattern.
 
A TinyEvent object can have one or more listeners. A listener is an object which implements any or all of the following handlers:

* onRegister() - Invoked when the listener is successfully registered.
* onSuccess() - Invoked when notifySuccess() is called.
* onError() - Invoked when notifyError() is called.
* onRemove() - Invoked when the listener is successfully removed.

For example:

Invoking TinyEvent's *notifySuccess()* method causes all of its listeners to be notified with a call to their *onSuccess()* method. Similarly, invoking *notifyError()* results in a call to a listener's *onError()* method.

### Version
1.0

### License
[Apache 2.0] [Apache]

### Links
* [TinyEvent Github Repo][Git]
* [TinyEvent Docs][JavaDocs]
* [TinyEvent Track Issues][Issues]

[Apache]: <http://www.apache.org/licenses/LICENSE-2.0>
[Git]: <https://github.com/rgr-myrg/tiny-event-js>
[JavaDocs]: <http://rgr-myrg.github.io/tiny-event-java/javadoc>
[Issues]: <https://github.com/rgr-myrg/tiny-event-js/issues>
