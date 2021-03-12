## Readme

## Title: **Shopping List & Calculator**

https://a2-lfleming-314.glitch.me/

## Description
This project allows the user to make a shopping list and see the total price of their items.
## Instructions
- To add an item, type in the item's name, unit price (price per item, per pound, etc.), and quantity into the input fields. Then click the `Add` button. The item will then appear in the table.
- To edit an item in the list table, click the `Edit` button next to it. The item's name, unit price, and quantity will be copied to the input fields. Change those as desired and then click the `Save` button to update the table.
- To delete an item from the list table, click the `Delete` button next to it.
## Derived Fields
- The server logic creates two derived fields, `Subtotal` and `Tax`. `Subtotal` is calculated by multiplying the unit price by the quantity. `Tax` is calculated by multiplying the subtotal by the Massachusetts tax rate of 0.065.
- The server logic also adds a third field, `ID`, which is a randomly generated identifier used by the program to keep track of items. This is technically not a derived field as it does not depend on any of the input fields.
## CSS
- Flexbox is used to position the items.
- There are no default fonts. The 3 fonts used (Arvo, Rock Salt, and Caveat) are imported from Google Fonts.
- The styling uses an analogous color scheme of pink (#9F17EB), purple (#5430F5), dark blue (#003ADB), bright blue (#3BBFF5), and green (#0CE8C4).

## **Technical Achievements**

- **Tech Achievement 1**: When the client submits data (either by adding, editing, or deleting items), the server sends back the updated data and the client-side display updates. Thus the client-side display always reflects the current state of the server-side data.

