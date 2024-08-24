---
title: Options
description: Overview of the options API.
---

Scripts are supposed to be pretty simple, but sometimes you want the user to configure them, for example to turn on/off specific abilities of the script instead of just enabling/disabling it entirely. You can do this using the options API, which allows you to add arbitrary entries into the script menu.

:::note

The options API goes hand in hand with [the event bus API](./event.md), so make sure to give that a read before attempting options.

:::

## Buttons

The most ubiquitous of them all, the button. It does exactly what one would expect it to do - an action is triggered when you press it.

```js
const button /*: ButtonOption */ = {
    type: "button",
    id: "my-script-button",
    label: "My amazing button", // optional, defaults to the id
};

export default {
    // ...
    options: [button],
    load(context /*: ScriptContext */) {
        // this is where the event bus comes in
        context.addEventListener("option_change", (e /*: OptionChangeEvent */) => {
            console.log("An option has been changed: ", e.option.id);
            console.log("Is it our button?", e.option === button);
        });
    },
    unload() {},
};
```
